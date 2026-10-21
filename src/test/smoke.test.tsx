import { describe, it, expect } from 'vitest';
import { SEED_COMPANIES } from '@/data/seedCompanies';
import {
  normalizeCompanySummary,
  normalizeCompanyProfile,
  normalizeDashboardSkills,
  scoreToDifficulty,
  proficiencyToBloom,
  scoreToCriticality,
} from '@/lib/companyData';
import { buildIntelligenceSections } from '@/data/intelligenceData';
import { getTopicsForSkill, SKILL_TOPICS_ROADMAP } from '@/data/skillTopics';

describe('JSS NOIDA Placement Intelligence Hub Smoke Tests', () => {
  it('loads the seed companies with Accenture record', () => {
    expect(SEED_COMPANIES).toHaveLength(1);
    const accenture = SEED_COMPANIES[0];
    expect(accenture.short_json.name).toBe('Accenture plc');
    expect(accenture.short_json.short_name).toBe('Accenture');
    expect(accenture.short_json.company_type).toBe('Dream');
  });

  it('normalizes summary and profile correctly', () => {
    const accenture = SEED_COMPANIES[0];
    const summary = normalizeCompanySummary(accenture.short_json, accenture.company_id);
    expect(summary.name).toBe('Accenture plc');
    expect(summary.category).toBe('Enterprise');

    const profile = normalizeCompanyProfile(accenture.full_json, accenture.short_json, accenture.company_id);
    expect(profile.summary.name).toBe('Accenture plc');
    expect(profile.ceo_name).toBe('Julie Sweet');
    expect(profile.headquarters_address).toBe('Dublin, Ireland');
  });

  it('normalizes all 12 seed skills and maps Bloom and Criticality properly', () => {
    expect(scoreToDifficulty(9)).toBe('EXPERT');
    expect(scoreToDifficulty(7)).toBe('ADVANCED');
    expect(scoreToDifficulty(5)).toBe('PRO');
    expect(scoreToDifficulty(2)).toBe('BEGINNER');

    expect(proficiencyToBloom(1)).toBe('CU');
    expect(proficiencyToBloom(3)).toBe('AP');
    expect(proficiencyToBloom(5)).toBe('AS');
    expect(proficiencyToBloom(7)).toBe('EV');
    expect(proficiencyToBloom(9)).toBe('CR');

    expect(scoreToCriticality(8)).toBe('Critical');
    expect(scoreToCriticality(6)).toBe('Important');
    expect(scoreToCriticality(3)).toBe('Baseline');

    expect(Object.keys(SKILL_TOPICS_ROADMAP)).toHaveLength(12);

    const accenture = SEED_COMPANIES[0];
    const skills = normalizeDashboardSkills(accenture.skill_levels);
    expect(skills).toHaveLength(12);

    const dsa = skills.find((s) => s.name === 'Data Structures & Algorithms');
    expect(dsa).toBeDefined();
    expect(dsa?.required_level).toBe(8);
    expect(dsa?.bloom).toBe('EV');
    expect(dsa?.criticality).toBe('Critical');
    expect(dsa?.difficulty).toBe('EXPERT');
  });

  it('provides a 10-level topic ladder for all 12 seed skills with length <= 90 chars', () => {
    const accenture = SEED_COMPANIES[0];
    accenture.skill_levels.forEach((skill) => {
      const ladder = getTopicsForSkill(skill.skill_set_name);
      expect(ladder).toHaveLength(10);
      ladder.forEach((lvl) => {
        expect(lvl.topic.length).toBeLessThanOrEqual(90);
        expect(lvl.level_number).toBeGreaterThanOrEqual(1);
        expect(lvl.level_number).toBeLessThanOrEqual(10);
      });
    });
  });

  it('generates all 22 intelligence sections in exact required order', () => {
    const accenture = SEED_COMPANIES[0];
    const profile = normalizeCompanyProfile(accenture.full_json, accenture.short_json, accenture.company_id);
    const sections = buildIntelligenceSections(profile);

    expect(sections).toHaveLength(22);

    const expectedTitles = [
      'Company Identity',
      'Overview & Vision',
      'Leadership',
      'Funding & Financials',
      'Global Presence',
      'Products & Services',
      'Technology Stack',
      'Partnerships & Ecosystem',
      'Competitive Landscape',
      'Market Opportunity',
      'Core Value Proposition & ESG',
      'Culture & Work Life',
      'Recent News & Milestones',
      'Sales & Customer Metrics',
      'Risk & Compliance',
      'Work Location & Commute',
      'Safety & Wellbeing',
      'Career Growth & Learning',
      'Brand & Reputation',
      'Compensation & Benefits',
      'Digital Presence & Ratings',
      'Contact Information',
    ];

    sections.forEach((sec, idx) => {
      expect(sec.title).toBe(expectedTitles[idx]);
    });
  });

  it('strictly adheres to hard constraint: NEVER display CTC, Stipend, or Selection Ratio', () => {
    const accenture = SEED_COMPANIES[0];
    const profile = normalizeCompanyProfile(accenture.full_json, accenture.short_json, accenture.company_id);
    const sections = buildIntelligenceSections(profile);

    sections.forEach((section) => {
      section.fields.forEach((field) => {
        const keyLower = field.key.toLowerCase();
        const labelLower = field.label.toLowerCase();
        expect(keyLower).not.toContain('ctc');
        expect(keyLower).not.toContain('stipend');
        expect(keyLower).not.toContain('selection_ratio');
        expect(labelLower).not.toContain('ctc');
        expect(labelLower).not.toContain('stipend');
        expect(labelLower).not.toContain('selection ratio');
      });
    });
  });
});

