export type { RawShortCompany, RawSkillLevel } from '@/data/seedCompanies';

export interface CompanySummary {
  id: number;
  name: string;
  short_name: string;
  logo_url: string;
  category: string;
  company_type: 'Super Dream' | 'Dream' | 'Standard' | 'Regular' | string;
  incorporation_year: number | string;
  employee_size: string;
  headquarters_address: string;
  operating_countries: string;
  office_locations: string;
  yoy_growth_rate: string;
  website_url: string;
}

export type DifficultyLevel = 'EXPERT' | 'ADVANCED' | 'PRO' | 'BEGINNER';
export type BloomLevel = 'CU' | 'AP' | 'AS' | 'EV' | 'CR';
export type CriticalityLevel = 'Critical' | 'Important' | 'Baseline';

export interface DashboardSkill {
  id: number;
  name: string;
  required_level: number;
  required_proficiency: string;
  difficulty: DifficultyLevel;
  bloom: BloomLevel;
  criticality: CriticalityLevel;
}

export interface CompanyProfile {
  summary: CompanySummary;
  raw: Record<string, any>;
  [key: string]: any;
}

// Helpers
export function asString(val: any, fallback = ''): string {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'string') return val.trim();
  return String(val).trim();
}

export function asRecord(val: any): Record<string, any> {
  if (val && typeof val === 'object' && !Array.isArray(val)) {
    return val;
  }
  return {};
}

export function splitItems(val: any): string[] {
  if (!val) return [];
  if (Array.isArray(val)) {
    return val.map((x) => asString(x)).filter(Boolean);
  }
  const str = asString(val);
  if (!str) return [];
  // Split on newlines, semicolons, bullets (•), and commas when in structured lists
  return str
    .split(/[\n;•]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !isNullish(s));
}

export function titleCaseFromCode(code: string): string {
  if (!code) return '';
  return code
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function scoreToDifficulty(score: number): DifficultyLevel {
  if (score >= 8) return 'EXPERT';
  if (score >= 6) return 'ADVANCED';
  if (score >= 4) return 'PRO';
  return 'BEGINNER';
}

export function proficiencyToBloom(levelOrProficiency: number | string): BloomLevel {
  const score = typeof levelOrProficiency === 'number' ? levelOrProficiency : parseInt(levelOrProficiency, 10);
  if (isNaN(score)) {
    const s = String(levelOrProficiency).toLowerCase();
    if (s.includes('expert') || s.includes('creat')) return 'CR';
    if (s.includes('advanced') || s.includes('eval')) return 'EV';
    if (s.includes('proficient') || s.includes('analy')) return 'AS';
    if (s.includes('intermediate') || s.includes('appl')) return 'AP';
    return 'CU';
  }
  if (score <= 2) return 'CU';
  if (score <= 4) return 'AP';
  if (score <= 6) return 'AS';
  if (score <= 8) return 'EV';
  return 'CR';
}

export function scoreToCriticality(score: number): CriticalityLevel {
  if (score >= 7) return 'Critical';
  if (score >= 5) return 'Important';
  return 'Baseline';
}

export function isNullish(val: any): boolean {
  if (val === null || val === undefined) return true;
  const s = String(val).trim().toLowerCase();
  return (
    s === '' ||
    s === 'na' ||
    s === 'n/a' ||
    s === 'none' ||
    s === '-' ||
    s === '--' ||
    s === 'null' ||
    s === 'undefined' ||
    s === 'not applicable'
  );
}

// Normalizers
export function normalizeCompanySummary(short_json: any, company_id = 1): CompanySummary {
  const raw = asRecord(short_json);
  return {
    id: company_id,
    name: asString(raw.name, 'Unknown Company'),
    short_name: asString(raw.short_name, asString(raw.name, 'Company')),
    logo_url: asString(raw.logo_url),
    category: asString(raw.category, 'Enterprise'),
    company_type: asString(raw.company_type, 'Dream'),
    incorporation_year: raw.incorporation_year || 'N/A',
    employee_size: asString(raw.employee_size, 'N/A'),
    headquarters_address: asString(raw.headquarters_address, 'N/A'),
    operating_countries: asString(raw.operating_countries, 'N/A'),
    office_locations: asString(raw.office_locations, 'N/A'),
    yoy_growth_rate: asString(raw.yoy_growth_rate, 'N/A'),
    website_url: asString(raw.website_url, ''),
  };
}

export function normalizeCompanyProfile(full_json: any, short_json?: any, company_id = 1): CompanyProfile {
  const full = asRecord(full_json);
  const short = asRecord(short_json);
  const summary = normalizeCompanySummary({ ...full, ...short }, company_id);

  return {
    ...full,
    summary,
    raw: full,
  };
}

export function normalizeDashboardSkills(skillLevels: any[]): DashboardSkill[] {
  if (!Array.isArray(skillLevels)) return [];
  return skillLevels.map((item, idx) => {
    const raw = asRecord(item);
    const score = Number(raw.required_level) || 5;
    return {
      id: Number(raw.skill_set_id) || idx + 1,
      name: asString(raw.skill_set_name, `Skill ${idx + 1}`),
      required_level: score,
      required_proficiency: asString(raw.required_proficiency, 'Proficient'),
      difficulty: scoreToDifficulty(score),
      bloom: proficiencyToBloom(score),
      criticality: scoreToCriticality(score),
    };
  });
}

