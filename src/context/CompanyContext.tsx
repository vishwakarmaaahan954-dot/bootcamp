import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { SEED_COMPANIES, SeedCompany } from '@/data/seedCompanies';
import {
  normalizeCompanyProfile,
  normalizeCompanySummary,
  normalizeDashboardSkills,
  CompanyProfile,
  CompanySummary,
  DashboardSkill,
} from '@/lib/companyData';

export interface SelectedCompanyStorage {
  companyId: number;
  companyName: string;
  logoUrl: string;
}

interface CompanyContextType {
  selectedCompany: SelectedCompanyStorage | null;
  currentCompany: SeedCompany | null;
  profile: CompanyProfile | null;
  summary: CompanySummary | null;
  skills: DashboardSkill[];
  allCompanies: SeedCompany[];
  selectCompany: (companyId: number) => void;
  isLoading: boolean;
}

const STORAGE_KEY = 'selected-company';

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [selectedCompany, setSelectedCompany] = useState<SelectedCompanyStorage | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore parse error
    }
    return null;
  });

  const [isLoading] = useState(false);

  // Sync / validate on startup
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: SelectedCompanyStorage = JSON.parse(stored);
        const match = SEED_COMPANIES.find((c) => c.company_id === parsed.companyId);
        if (match) {
          setSelectedCompany(parsed);
        } else if (SEED_COMPANIES.length > 0) {
          // If stored ID doesn't exist anymore, fallback to first company
          const defaultCompany = SEED_COMPANIES[0];
          const newSelection = {
            companyId: defaultCompany.company_id,
            companyName: defaultCompany.short_json.name,
            logoUrl: defaultCompany.short_json.logo_url,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newSelection));
          setSelectedCompany(newSelection);
        }
      }
    } catch (err) {
      console.error('Failed to restore company from localStorage', err);
    }
  }, []);

  const selectCompany = (companyId: number) => {
    const match = SEED_COMPANIES.find((c) => c.company_id === companyId);
    if (match) {
      const payload: SelectedCompanyStorage = {
        companyId: match.company_id,
        companyName: match.short_json.name,
        logoUrl: match.short_json.logo_url,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setSelectedCompany(payload);
    }
  };

  const currentCompany = useMemo(() => {
    if (!selectedCompany) return null;
    return SEED_COMPANIES.find((c) => c.company_id === selectedCompany.companyId) || null;
  }, [selectedCompany]);

  const profile = useMemo(() => {
    if (!currentCompany) return null;
    return normalizeCompanyProfile(currentCompany.full_json, currentCompany.short_json, currentCompany.company_id);
  }, [currentCompany]);

  const summary = useMemo(() => {
    if (!currentCompany) return null;
    return normalizeCompanySummary(currentCompany.short_json, currentCompany.company_id);
  }, [currentCompany]);

  const skills = useMemo(() => {
    if (!currentCompany) return [];
    return normalizeDashboardSkills(currentCompany.skill_levels);
  }, [currentCompany]);

  return (
    <CompanyContext.Provider
      value={{
        selectedCompany,
        currentCompany,
        profile,
        summary,
        skills,
        allCompanies: SEED_COMPANIES,
        selectCompany,
        isLoading,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany(): CompanyContextType {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}

