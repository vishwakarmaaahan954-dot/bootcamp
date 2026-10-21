import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCompanies, useCompanyProfile, useCompanySkills } from '@/lib/companyApi';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Phase 2 — Supabase Data Layer Hooks', () => {
  it('useCompanies returns company summaries from company_json table', async () => {
    const { result } = renderHook(() => useCompanies(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data!.length).toBeGreaterThanOrEqual(1);

    const first = result.current.data![0];
    expect(first.name).toBe('Accenture plc');
    expect(first.short_name).toBe('Accenture');
    expect(first.company_type).toBe('Dream');
  });

  it('useCompanyProfile returns full profile from company_json for given id', async () => {
    const { result } = renderHook(() => useCompanyProfile(1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    const profile = result.current.data!;
    expect(profile.summary.name).toBe('Accenture plc');
    expect(profile.raw.headquarters_address).toBe('Dublin, Ireland');
    expect(profile.raw.ceo_name).toBe('Julie Sweet');
  });

  it('useCompanySkills returns 12 skills with 10-level roadmaps', async () => {
    const { result } = renderHook(() => useCompanySkills(1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    const skills = result.current.data!;
    expect(skills).toHaveLength(12);

    const dsa = skills.find((s) => s.name === 'Data Structures & Algorithms');
    expect(dsa).toBeDefined();
    expect(dsa?.required_level).toBe(8);
    expect(dsa?.roadmap).toHaveLength(10);
    expect(dsa?.roadmap[0].level_number).toBe(1);
  });
});
