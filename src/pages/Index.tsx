import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Layers, RotateCcw } from 'lucide-react';
import { SEED_COMPANIES } from '@/data/seedCompanies';
import { normalizeCompanySummary, CompanySummary } from '@/lib/companyData';
import { CompanyCard } from '@/components/CompanyCard';

const COLLEGE_NAME = "JSS Academy Of Technical Education";
const COLLEGE_SHORT = "JSS NOIDA";

type CategoryFilter = 'All' | 'Super Dream' | 'Dream' | 'Standard' | 'Regular';

export const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [isLoading] = useState(false);

  // 200ms debounce on search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Summaries
  const allSummaries: CompanySummary[] = useMemo(() => {
    return SEED_COMPANIES.map((c) => normalizeCompanySummary(c.short_json, c.company_id));
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = {
      All: allSummaries.length,
      'Super Dream': 0,
      Dream: 0,
      Standard: 0,
      Regular: 0,
    };
    allSummaries.forEach((c) => {
      const type = (c.company_type || '').toLowerCase();
      if (type.includes('super dream')) counts['Super Dream']++;
      else if (type.includes('dream')) counts['Dream']++;
      else if (type.includes('standard')) counts['Standard']++;
      else counts['Regular']++;
    });
    return counts;
  }, [allSummaries]);

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return allSummaries.filter((comp) => {
      // Category filter
      if (activeCategory !== 'All') {
        const type = (comp.company_type || '').toLowerCase();
        if (activeCategory === 'Super Dream' && !type.includes('super dream')) return false;
        if (activeCategory === 'Dream' && (!type.includes('dream') || type.includes('super dream'))) return false;
        if (activeCategory === 'Standard' && !type.includes('standard')) return false;
        if (activeCategory === 'Regular' && (type.includes('dream') || type.includes('standard'))) return false;
      }

      // Search filter (name, short_name, headquarters, category)
      if (debouncedSearch.trim()) {
        const query = debouncedSearch.toLowerCase().trim();
        const matchName = comp.name.toLowerCase().includes(query);
        const matchShort = comp.short_name.toLowerCase().includes(query);
        const matchHq = comp.headquarters_address.toLowerCase().includes(query);
        const matchCat = comp.category.toLowerCase().includes(query);
        return matchName || matchShort || matchHq || matchCat;
      }

      return true;
    });
  }, [allSummaries, activeCategory, debouncedSearch]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setDebouncedSearch('');
    setActiveCategory('All');
  };

  const categories: { label: CategoryFilter; colorHex: string; activeClasses: string }[] = [
    { label: 'All', colorHex: '#2563eb', activeClasses: 'bg-slate-900 text-white border-slate-900' },
    { label: 'Super Dream', colorHex: '#7c3aed', activeClasses: 'bg-[#7c3aed] text-white border-[#7c3aed]' },
    { label: 'Dream', colorHex: '#2563eb', activeClasses: 'bg-[#2563eb] text-white border-[#2563eb]' },
    { label: 'Standard', colorHex: '#16a34a', activeClasses: 'bg-[#16a34a] text-white border-[#16a34a]' },
    { label: 'Regular', colorHex: '#d97706', activeClasses: 'bg-[#d97706] text-white border-[#d97706]' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="font-heading font-bold text-base text-slate-900 block leading-tight">
                {COLLEGE_SHORT}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block">
                Placement Intelligence
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Campus Recruitment 2024-25
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section: Clean white background, bottom border, large heading, small subtitle, search bar directly below */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Pill: "{COLLEGE_SHORT} · INTELLIGENCE PLATFORM" */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>{COLLEGE_SHORT} · INTELLIGENCE PLATFORM</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-heading max-w-4xl mx-auto">
            {COLLEGE_NAME} Companies Research &amp; Placement Analytics Portal
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            Your strategic edge for campus placements
          </p>

          {/* Search Bar Directly Below */}
          <div className="mt-8 max-w-2xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies by name, industry, headquarters..."
                className="w-full pl-12 pr-11 py-3.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-slate-900 text-sm sm:text-base rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.label;
              const count = categoryCounts[cat.label] || 0;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isActive
                      ? cat.activeClasses
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results count label */}
          <div className="text-xs sm:text-sm text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredCompanies.length}</strong>{' '}
            {filteredCompanies.length === 1 ? 'recruiting partner' : 'recruiting partners'}
          </div>
        </div>

        {/* 8-Card Skeleton when loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 rounded-lg bg-slate-200"></div>
                  <div className="w-16 h-5 rounded-full bg-slate-200"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-slate-200"></div>
                  <div className="h-3 w-1/2 rounded bg-slate-100"></div>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-3 w-4/5 rounded bg-slate-100"></div>
                  <div className="h-3 w-3/5 rounded bg-slate-100"></div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between">
                  <div className="h-3 w-20 rounded bg-slate-200"></div>
                  <div className="h-3 w-4 rounded bg-slate-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCompanies.length > 0 ? (
          /* Grid of Companies */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCompanies.map((comp) => (
              <CompanyCard key={comp.id} company={comp} />
            ))}
          </div>
        ) : (
          /* Empty State with Reset CTA */
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              No matching recruiting companies found
            </h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
              No companies match your search criteria. Try modifying your filters or clearing search.
            </p>
            <div className="mt-6">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Search &amp; Filters
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Clean Bottom Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-16 text-center text-xs text-slate-500">
        <p className="font-medium text-slate-700">{COLLEGE_NAME}</p>
        <p className="mt-1 text-slate-400">
          Placement Intelligence Hub &bull; Dedicated Research &amp; Analytics for Students
        </p>
      </footer>
    </div>
  );
};

