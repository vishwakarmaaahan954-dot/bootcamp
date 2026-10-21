import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import {
  normalizeCompanySummary,
  normalizeCompanyProfile,
  normalizeDashboardSkills,
  CompanySummary,
  CompanyProfile,
  DashboardSkill,
} from './companyData';
import { SEED_COMPANIES } from '@/data/seedCompanies';
import { getTopicsForSkill, SkillTopicLevel } from '@/data/skillTopics';

// Extended DashboardSkill with attached roadmap
export interface SkillWithRoadmap extends DashboardSkill {
  roadmap: SkillTopicLevel[];
}

/**
 * 1. useCompanies hook
 * Query: SELECT company_id, short_json FROM company_json
 * Mapped through normalizeCompanySummary(short_json, company_id)
 */
export function useCompanies() {
  return useQuery<CompanySummary[], Error>({
    queryKey: ['companies'],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        // Documented seed fallback when credentials are not yet set
        return SEED_COMPANIES.map((c) =>
          normalizeCompanySummary(c.short_json, c.company_id)
        );
      }

      try {
        const { data, error } = await supabase
          .from('company_json')
          .select('company_id, short_json');

        if (error) {
          console.warn('[useCompanies] Supabase warning:', error.message);
          return SEED_COMPANIES.map((c) =>
            normalizeCompanySummary(c.short_json, c.company_id)
          );
        }

        if (!data || data.length === 0) {
          // If remote table has 0 rows yet, fall back gracefully to seed
          return SEED_COMPANIES.map((c) =>
            normalizeCompanySummary(c.short_json, c.company_id)
          );
        }

        return data.map((row: any) =>
          normalizeCompanySummary(row.short_json, row.company_id)
        );
      } catch (err: any) {
        console.warn('[useCompanies] Network error, falling back to seed:', err.message);
        return SEED_COMPANIES.map((c) =>
          normalizeCompanySummary(c.short_json, c.company_id)
        );
      }
    },
  });
}

/**
 * 2. useCompanyProfile hook
 * Query: SELECT company_id, short_json, full_json FROM company_json WHERE company_id = :id
 * Mapped through normalizeCompanyProfile(full_json, short_json, company_id)
 */
export function useCompanyProfile(companyId: number | string | null | undefined) {
  const numericId = Number(companyId) || 1;

  return useQuery<CompanyProfile, Error>({
    queryKey: ['company-profile', numericId],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        // Documented seed fallback
        const match =
          SEED_COMPANIES.find((c) => c.company_id === numericId) ||
          SEED_COMPANIES[0];
        return normalizeCompanyProfile(
          match.full_json,
          match.short_json,
          match.company_id
        );
      }

      try {
        const { data, error } = await supabase
          .from('company_json')
          .select('company_id, short_json, full_json')
          .eq('company_id', numericId)
          .maybeSingle();

        if (error || !data) {
          // Fall back gracefully if row not found or database empty
          const match =
            SEED_COMPANIES.find((c) => c.company_id === numericId) ||
            SEED_COMPANIES[0];
          return normalizeCompanyProfile(
            match.full_json,
            match.short_json,
            match.company_id
          );
        }

        return normalizeCompanyProfile(data.full_json, data.short_json, data.company_id);
      } catch (err: any) {
        console.warn(`[useCompanyProfile] Error for id ${numericId}, using fallback:`, err.message);
        const match =
          SEED_COMPANIES.find((c) => c.company_id === numericId) ||
          SEED_COMPANIES[0];
        return normalizeCompanyProfile(
          match.full_json,
          match.short_json,
          match.company_id
        );
      }
    },
    enabled: Boolean(numericId),
  });
}

/**
 * 3. useCompanySkills hook
 * Reads ONLY from 4 simple tables:
 *   - public.company_skill_levels  (company_id, skill_set_id, required_level, required_proficiency_level_id)
 *   - public.skill_set_master      (skill_set_id, skill_set_name, short_name)
 *   - public.proficiency_levels    (proficiency_level_id, proficiency_name, proficiency_code)
 *   - public.skill_set_topics      (skill_set_id, level_number, topics)
 */
export function useCompanySkills(companyId: number | string | null | undefined) {
  const numericId = Number(companyId) || 1;

  return useQuery<SkillWithRoadmap[], Error>({
    queryKey: ['company-skills', numericId],
    queryFn: async () => {
      const getFallback = () => {
        const match =
          SEED_COMPANIES.find((c) => c.company_id === numericId) ||
          SEED_COMPANIES[0];
        const normalized = normalizeDashboardSkills(match.skill_levels);
        return normalized.map((skill) => ({
          ...skill,
          roadmap: getTopicsForSkill(skill.name),
        }));
      };

      if (!isSupabaseConfigured) {
        return getFallback();
      }

      try {
        // 1. Fetch company skill levels for this company
        const { data: skillLevelsData, error: skillLevelsErr } = await supabase
          .from('company_skill_levels')
          .select('company_id, skill_set_id, required_level, required_proficiency_level_id')
          .eq('company_id', numericId);

        if (skillLevelsErr || !skillLevelsData || skillLevelsData.length === 0) {
          return getFallback();
        }

        const skillSetIds = skillLevelsData.map((s: any) => s.skill_set_id);

        // 2. Fetch skill names from skill_set_master
        const { data: skillMasterData, error: masterErr } = await supabase
          .from('skill_set_master')
          .select('skill_set_id, skill_set_name, short_name')
          .in('skill_set_id', skillSetIds);

        if (masterErr) {
          return getFallback();
        }

        // 3. Fetch proficiency level definitions
        const { data: profData, error: profErr } = await supabase
          .from('proficiency_levels')
          .select('proficiency_level_id, proficiency_name, proficiency_code');

        if (profErr) {
          return getFallback();
        }

        // 4. Fetch 10-level topics from skill_set_topics
        const { data: topicsData, error: topicsErr } = await supabase
          .from('skill_set_topics')
          .select('skill_set_id, level_number, topics')
          .in('skill_set_id', skillSetIds)
          .order('level_number', { ascending: true });

        if (topicsErr) {
          return getFallback();
        }

        // Build lookups
        const masterMap = new Map<number, string>();
        (skillMasterData || []).forEach((m: any) => {
          masterMap.set(m.skill_set_id, m.skill_set_name || m.short_name || `Skill ${m.skill_set_id}`);
        });

        const profMap = new Map<number, string>();
        (profData || []).forEach((p: any) => {
          profMap.set(p.proficiency_level_id, p.proficiency_name || p.proficiency_code || 'Proficient');
        });

        const topicsMap = new Map<number, SkillTopicLevel[]>();
        (topicsData || []).forEach((t: any) => {
          const list = topicsMap.get(t.skill_set_id) || [];
          list.push({
            level_number: Number(t.level_number) || list.length + 1,
            topic: String(t.topics || t.topic || `Level ${t.level_number} Topics`),
          });
          topicsMap.set(t.skill_set_id, list);
        });

        // Assemble raw skill shapes for normalizer
        const rawSkillLevels = skillLevelsData.map((row: any) => {
          const skillName = masterMap.get(row.skill_set_id) || `Skill ${row.skill_set_id}`;
          const profName = profMap.get(row.required_proficiency_level_id) || 'Proficient';
          return {
            skill_set_id: row.skill_set_id,
            skill_set_name: skillName,
            required_level: row.required_level,
            required_proficiency: profName,
          };
        });

        // Normalize through pure companyData normalizer
        const normalizedSkills = normalizeDashboardSkills(rawSkillLevels);

        // Attach 10-level roadmaps
        return normalizedSkills.map((skill) => {
          const customRoadmap = topicsMap.get(skill.id);
          const roadmap =
            customRoadmap && customRoadmap.length > 0
              ? customRoadmap
              : getTopicsForSkill(skill.name);
          return {
            ...skill,
            roadmap,
          };
        });
      } catch (err: any) {
        console.warn('[useCompanySkills] Exception, falling back to seed:', err.message);
        return getFallback();
      }
    },
    enabled: Boolean(numericId),
  });
}
