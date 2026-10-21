import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CompanyProfile, CompanySummary } from '@/lib/companyData';
import { useCompanyProfile } from '@/lib/companyApi';

export interface SelectedCompanyStorage {
  companyId: number;
  companyName: string;
  logoUrl: string;
}

interface CompanyContextType {
  selectedCompany: SelectedCompanyStorage | null;
  companyId: number | null;
  profile: CompanyProfile | null;
  summary: CompanySummary | null;
  selectCompany: (companyId: number, companyName?: string, logoUrl?: string) => void;
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

  // Query company profile from React Query hook
  const { data: profile, isLoading } = useCompanyProfile(selectedCompany?.companyId);

  // Restore/Sync on startup
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: SelectedCompanyStorage = JSON.parse(stored);
        if (parsed && parsed.companyId) {
          setSelectedCompany(parsed);
        }
      }
    } catch (err) {
      console.error('Failed to restore company from localStorage', err);
    }
  }, []);

  const selectCompany = (companyId: number, companyName?: string, logoUrl?: string) => {
    const payload: SelectedCompanyStorage = {
      companyId,
      companyName: companyName || (selectedCompany?.companyId === companyId ? selectedCompany.companyName : 'Company'),
      logoUrl: logoUrl || (selectedCompany?.companyId === companyId ? selectedCompany.logoUrl : ''),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSelectedCompany(payload);
  };

  const summary: CompanySummary | null = profile?.summary || (selectedCompany ? {
    id: selectedCompany.companyId,
    name: selectedCompany.companyName,
    short_name: selectedCompany.companyName,
    logo_url: selectedCompany.logoUrl,
    category: 'Enterprise',
    company_type: 'Dream',
    incorporation_year: 'N/A',
    employee_size: 'N/A',
    headquarters_address: 'N/A',
    operating_countries: 'N/A',
    office_locations: 'N/A',
    yoy_growth_rate: 'N/A',
    website_url: '',
  } : null);

  return (
    <CompanyContext.Provider
      value={{
        selectedCompany,
        companyId: selectedCompany?.companyId || null,
        profile: profile || null,
        summary,
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
