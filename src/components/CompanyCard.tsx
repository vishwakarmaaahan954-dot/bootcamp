import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { CompanyLogo } from '@/components/CompanyLogo';
import { isNullish, CompanySummary } from '@/lib/companyData';
import { useCompany } from '@/context/CompanyContext';

interface CompanyCardProps {
  company: CompanySummary;
}

export const getCategoryBadgeStyle = (category?: string) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('super dream')) {
    return {
      bg: 'bg-[#7c3aed]/10',
      text: 'text-[#7c3aed]',
      border: 'border-[#7c3aed]/20',
      label: 'Super Dream',
    };
  }
  if (cat.includes('dream')) {
    return {
      bg: 'bg-[#2563eb]/10',
      text: 'text-[#2563eb]',
      border: 'border-[#2563eb]/20',
      label: 'Dream',
    };
  }
  if (cat.includes('standard')) {
    return {
      bg: 'bg-[#16a34a]/10',
      text: 'text-[#16a34a]',
      border: 'border-[#16a34a]/20',
      label: 'Standard',
    };
  }
  return {
    bg: 'bg-[#d97706]/10',
    text: 'text-[#d97706]',
    border: 'border-[#d97706]/20',
    label: 'Regular',
  };
};

export const CompanyCard = memo(function CompanyCard({ company }: CompanyCardProps) {
  const navigate = useNavigate();
  const { selectCompany } = useCompany();

  const handleClick = () => {
    // 1. Save selected-company to localStorage + update CompanyContext via selectCompany
    selectCompany(company.id, company.name, company.logo_url);
    // 2. Navigate to /company/intelligence
    navigate('/company/intelligence');
  };

  const badgeStyle = getCategoryBadgeStyle(company.company_type || company.category);

  const renderValue = (val: string | number | undefined, fallback = 'not publicly available') => {
    if (isNullish(val)) {
      return <span className="italic text-slate-400 font-normal">{fallback}</span>;
    }
    return <span className="text-slate-700 font-medium">{val}</span>;
  };

  const isGrowthNegative = company.yoy_growth_rate && company.yoy_growth_rate.trim().startsWith('-');
  const GrowthIcon = isGrowthNegative ? TrendingDown : TrendingUp;
  const growthColor = isGrowthNegative ? 'text-red-600' : 'text-emerald-600';

  let domain = '';
  try {
    if (company.website_url) {
      domain = new URL(company.website_url).hostname.replace(/^www\./, '');
    }
  } catch {
    domain = '';
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md cursor-pointer text-left"
    >
      <div>
        {/* Top Header: Logo + Category Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <CompanyLogo
            name={company.name}
            logoUrl={company.logo_url}
            domain={domain}
            size="md"
          />
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
          >
            {badgeStyle.label}
          </span>
        </div>

        {/* Company Name & Short Name */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 font-heading">
          {company.name}
        </h3>
        {company.short_name && company.short_name !== company.name && (
          <p className="text-xs text-slate-500 font-medium mb-3">
            {company.short_name}
          </p>
        )}

        {/* Key Metrics list */}
        <div className="mt-3 space-y-2 text-xs">
          {/* Headquarters */}
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{renderValue(company.headquarters_address)}</span>
          </div>

          {/* Size */}
          <div className="flex items-center gap-2 text-slate-600">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{renderValue(company.employee_size)}</span>
          </div>

          {/* Growth rate */}
          <div className="flex items-center gap-2 text-slate-600">
            <GrowthIcon className={`w-3.5 h-3.5 shrink-0 ${growthColor}`} />
            <span className={`font-semibold ${growthColor}`}>
              {company.yoy_growth_rate ? company.yoy_growth_rate : <span className="italic text-slate-400 font-normal">not publicly available</span>}
            </span>
            <span className="text-slate-400 font-normal">YoY growth</span>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-medium text-blue-600">
        <span className="group-hover:underline">Explore Intelligence</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
});

