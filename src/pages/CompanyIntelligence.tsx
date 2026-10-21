import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  Linkedin,
  ExternalLink,
  Star,
  Video,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { useCompany } from '@/context/CompanyContext';
import { CompanyLogo } from '@/components/CompanyLogo';
import { buildIntelligenceSections, IntelligenceSection, IntelligenceField } from '@/data/intelligenceData';
import { isNullish, splitItems } from '@/lib/companyData';

// Memoized Field Row
const FieldRow = memo(function FieldRow({ field }: { field: IntelligenceField }) {
  const renderFieldValue = () => {
    const rawVal = field.value;

    if (isNullish(rawVal)) {
      return (
        <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-xs italic text-slate-500 font-medium">
          Not Available
        </span>
      );
    }

    const strVal = String(rawVal).trim();

    // Specific field type: url
    if (field.type === 'url' || strVal.startsWith('http://') || strVal.startsWith('https://')) {
      return (
        <a
          href={strVal}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline break-all font-medium"
        >
          <span>{strVal}</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </a>
      );
    }

    // Specific field type: video
    if (field.type === 'video') {
      return (
        <a
          href={strVal}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-medium text-xs border border-red-200 transition-colors"
        >
          <Video className="w-3.5 h-3.5 shrink-0 text-red-600" />
          <span>Watch Corporate Media ({strVal})</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      );
    }

    // Specific field type: rating
    if (field.type === 'rating' || /\b\d+(\.\d+)?\/5\b/.test(strVal)) {
      return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-semibold text-xs">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{strVal}</span>
        </div>
      );
    }

    // List or auto-pill detection on semicolons
    if (strVal.includes(';') || field.type === 'list') {
      const items = splitItems(strVal);
      if (items.length > 1) {
        return (
          <div className="flex flex-wrap gap-1.5">
            {items.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200/60"
              >
                <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        );
      }
    }

    // Multiple comma-separated items with at least 3 parts
    if (strVal.includes(',') && strVal.split(',').length >= 3 && !strVal.includes('.')) {
      const parts = strVal.split(',').map((p) => p.trim()).filter(Boolean);
      return (
        <div className="flex flex-wrap gap-1.5">
          {parts.map((p, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
            >
              {p}
            </span>
          ))}
        </div>
      );
    }

    // Standard text or paragraph
    return (
      <div className="text-slate-800 text-sm leading-relaxed whitespace-pre-line font-normal">
        {strVal}
      </div>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline py-3 border-b border-slate-100 last:border-b-0 gap-1.5 sm:gap-4">
      <div className="sm:w-1/3 text-xs sm:text-sm font-medium text-slate-500 shrink-0">
        {field.label}
      </div>
      <div className="sm:w-2/3">{renderFieldValue()}</div>
    </div>
  );
});

// Memoized Section Card
const SectionCard = memo(function SectionCard({
  section,
  index,
}: {
  section: IntelligenceSection;
  index: number;
}) {
  const Icon = section.icon || HelpCircle;
  const count = section.fields.length;

  return (
    <div
      id={`section-${index}`}
      data-section-index={index}
      className="scroll-mt-36 rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs transition-shadow hover:shadow-sm"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              {section.title}
            </h2>
          </div>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
          {count} {count === 1 ? 'datapoint' : 'datapoints'}
        </span>
      </div>

      {/* Fields List */}
      <div className="divide-y divide-slate-100">
        {section.fields.map((field) => (
          <FieldRow key={field.key} field={field} />
        ))}
      </div>
    </div>
  );
});

export const CompanyIntelligence: React.FC = () => {
  const { currentCompany, profile, summary } = useCompany();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const isScrollingRef = useRef(false);
  const tabListRef = useRef<HTMLDivElement>(null);

  // Route Guard: If no company data exists even after storage check, navigate back to "/"
  useEffect(() => {
    if (!currentCompany && !summary) {
      navigate('/', { replace: true });
    }
  }, [currentCompany, summary, navigate]);

  const sections = useMemo(() => {
    return buildIntelligenceSections(profile);
  }, [profile]);

  // Auto-center active tab button in tab bar
  const centerActiveTab = (index: number) => {
    if (!tabListRef.current) return;
    const container = tabListRef.current;
    const tabElement = container.children[index] as HTMLElement;
    if (tabElement) {
      const scrollLeft =
        tabElement.offsetLeft - container.offsetWidth / 2 + tabElement.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  // Scroll to section handler with guard
  const scrollToSection = (idx: number) => {
    isScrollingRef.current = true;
    setActiveTab(idx);
    centerActiveTab(idx);

    const el = document.getElementById(`section-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  // Scroll spy effect using IntersectionObserver
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const sectionElements = sections.map((_, idx) =>
        document.getElementById(`section-${idx}`)
      );

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(i);
          centerActiveTab(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  if (!summary) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-600 border-t-transparent" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Loading Company Intelligence...
          </span>
        </div>
      </div>
    );
  }

  const websiteUrl = summary.website_url;
  const linkedinUrl = profile?.raw?.linkedin_url || `https://www.linkedin.com/company/${encodeURIComponent(summary.short_name || summary.name)}`;

  return (
    <div className="min-h-full pb-20">
      {/* Sticky Top Information Bar:
          Left: Company logo, Company name, Industry badge
          Right: Website button, LinkedIn button
          NO hero section, NO gradient background
      */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left: Logo, Name, Industry badge */}
          <div className="flex items-center gap-3.5 min-w-0">
            <CompanyLogo
              name={summary.name}
              logoUrl={summary.logo_url}
              size="md"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 font-heading truncate">
                  {summary.name}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {summary.category || 'Enterprise'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {summary.headquarters_address} &bull; {summary.employee_size}
              </p>
            </div>
          </div>

          {/* Right: Website button, LinkedIn button */}
          <div className="flex items-center gap-2.5 shrink-0">
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>Website</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors shadow-2xs"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-blue-400" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Tab Bar (22 tabs) */}
      <div className="sticky top-[69px] z-20 border-b border-slate-200 bg-slate-50/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-2">
        <div
          ref={tabListRef}
          className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {sections.map((sec, idx) => {
            const isActive = activeTab === idx;
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(idx)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 bg-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{sec.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Sections Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {sections.map((section, idx) => (
          <SectionCard key={section.id} section={section} index={idx} />
        ))}
      </div>
    </div>
  );
};

