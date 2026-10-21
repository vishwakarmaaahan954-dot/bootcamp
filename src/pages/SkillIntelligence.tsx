import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Info,
} from 'lucide-react';
import { useCompany } from '@/context/CompanyContext';
import { CompanyLogo } from '@/components/CompanyLogo';
import { DashboardSkill } from '@/lib/companyData';
import { getTopicsForSkill } from '@/data/skillTopics';

// Exact Bloom Level Colors
const BLOOM_INFO = {
  CU: {
    code: 'CU',
    name: 'Cognitive Understanding',
    level: 'Levels 1–2',
    colorHex: '#3b82f6',
    bgLight: 'bg-[#3b82f6]/10',
    border: 'border-[#3b82f6]/30',
    text: 'text-[#3b82f6]',
  },
  AP: {
    code: 'AP',
    name: 'Application',
    level: 'Levels 3–4',
    colorHex: '#22c55e',
    bgLight: 'bg-[#22c55e]/10',
    border: 'border-[#22c55e]/30',
    text: 'text-[#22c55e]',
  },
  AS: {
    code: 'AS',
    name: 'Analysis & Synthesis',
    level: 'Levels 5–6',
    colorHex: '#eab308',
    bgLight: 'bg-[#eab308]/10',
    border: 'border-[#eab308]/30',
    text: 'text-[#eab308]',
  },
  EV: {
    code: 'EV',
    name: 'Evaluation',
    level: 'Levels 7–8',
    colorHex: '#ef4444',
    bgLight: 'bg-[#ef4444]/10',
    border: 'border-[#ef4444]/30',
    text: 'text-[#ef4444]',
  },
  CR: {
    code: 'CR',
    name: 'Creation',
    level: 'Levels 9–10',
    colorHex: '#a855f7',
    bgLight: 'bg-[#a855f7]/10',
    border: 'border-[#a855f7]/30',
    text: 'text-[#a855f7]',
  },
};

const CRITICALITY_CONFIG = {
  Critical: {
    label: 'Critical Priority',
    scoreRange: 'Score ≥ 7/10',
    desc: 'Mandatory technical threshold for shortlisting and clearing interviews.',
    color: 'text-red-700 bg-red-50 border-red-200',
    badge: 'bg-red-100 text-red-800 border-red-300',
    dot: 'bg-red-500',
  },
  Important: {
    label: 'Important Core',
    scoreRange: 'Score 5–6/10',
    desc: 'Key technical competencies tested during core technical discussions.',
    color: 'text-amber-700 bg-amber-50 border-amber-200',
    badge: 'bg-amber-100 text-amber-800 border-amber-300',
    dot: 'bg-amber-500',
  },
  Baseline: {
    label: 'Baseline Foundation',
    scoreRange: 'Score < 5/10',
    desc: 'Foundational baseline knowledge expected of campus engineering hires.',
    color: 'text-blue-700 bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-800 border-blue-300',
    dot: 'bg-blue-500',
  },
};

interface SkillCardProps {
  skill: DashboardSkill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const topics = useMemo(() => getTopicsForSkill(skill.name), [skill.name]);

  const bloomMeta = BLOOM_INFO[skill.bloom] || BLOOM_INFO.CU;
  const critMeta = CRITICALITY_CONFIG[skill.criticality] || CRITICALITY_CONFIG.Baseline;

  const percentage = (skill.required_level / 10) * 100;

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-xs transition-all hover:border-slate-300">
      {/* Skill Card Header */}
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Name and Badges */}
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {skill.name}
              </h3>
              {/* Bloom Level Badge */}
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border ${bloomMeta.bgLight} ${bloomMeta.text} ${bloomMeta.border}`}
                title={`${bloomMeta.name} (${bloomMeta.level})`}
              >
                {skill.bloom} &bull; {bloomMeta.name}
              </span>
              {/* Criticality Label */}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold border ${critMeta.badge}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${critMeta.dot}`} />
                {skill.criticality}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Required Target: <strong className="text-slate-800">{skill.required_proficiency}</strong> proficiency (Tier {skill.required_level}/10)
            </p>
          </div>

          {/* Right: Score and Progress Display */}
          <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2 shrink-0">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-slate-900 font-heading">
                {skill.required_level}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ 10</span>
            </div>
          </div>
        </div>

        {/* Progress Bar with Bloom Colored Fill */}
        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${percentage}%`,
                backgroundColor: bloomMeta.colorHex,
              }}
            />
          </div>
        </div>

        {/* Expand / Collapse Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            {isExpanded ? (
              <>
                <span>Hide 10-Level Roadmap</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>View Complete 10-Level Roadmap</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
          <span className="text-[11px] text-slate-400 font-medium">
            Target benchmark: Level {skill.required_level}
          </span>
        </div>
      </div>

      {/* Expandable 10-Level Roadmap */}
      {isExpanded && (
        <div className="border-t border-slate-100 bg-slate-50/70 p-5 rounded-b-xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            Skill Ladder &amp; Curriculum Checklist
          </h4>

          <div className="space-y-2">
            {topics.map((t) => {
              const isRequiredLevel = t.level_number === skill.required_level;
              const isCompleted = t.level_number <= skill.required_level;
              const isBeyondScope = t.level_number > skill.required_level;

              return (
                <div
                  key={t.level_number}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border transition-colors ${
                    isRequiredLevel
                      ? 'bg-blue-50/80 border-blue-300 shadow-2xs'
                      : isCompleted
                      ? 'bg-white border-slate-200'
                      : 'bg-slate-100/60 border-slate-200/60 opacity-70'
                  }`}
                >
                  {/* Icon indicator */}
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          isRequiredLevel ? 'text-blue-600 font-bold' : 'text-emerald-600'
                        }`}
                      />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                  </div>

                  {/* Level Number & Label */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-xs font-bold ${
                          isRequiredLevel
                            ? 'text-blue-900'
                            : isCompleted
                            ? 'text-slate-800'
                            : 'text-slate-500'
                        }`}
                      >
                        Level {t.level_number}
                      </span>

                      {isRequiredLevel && (
                        <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-600 text-white">
                          Target Required Level
                        </span>
                      )}

                      {isBeyondScope && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-medium bg-slate-200 text-slate-600">
                          <Lock className="w-2.5 h-2.5" />
                          Beyond scope
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs mt-0.5 ${
                        isCompleted ? 'text-slate-700' : 'text-slate-500 italic'
                      }`}
                    >
                      {t.topic}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const SkillIntelligence: React.FC = () => {
  const { summary, skills, currentCompany } = useCompany();
  const navigate = useNavigate();

  // Route Guard: If selected-company is missing, navigate("/")
  useEffect(() => {
    if (!currentCompany && !summary) {
      navigate('/', { replace: true });
    }
  }, [currentCompany, summary, navigate]);

  // Skills sorted descending by required_level
  const sortedSkills = useMemo(() => {
    return [...skills].sort((a, b) => b.required_level - a.required_level);
  }, [skills]);

  if (!summary) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-600 border-t-transparent" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Loading Skill Intelligence...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-20">
      {/* Sticky Header: Company Logo + "{Company} Skill Intelligence" */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CompanyLogo
              name={summary.name}
              logoUrl={summary.logo_url}
              size="md"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                {summary.short_name || summary.name} Skill Intelligence
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Placement competency framework &amp; technical hiring requirements
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              {skills.length} Evaluated Competencies
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Bloom Taxonomy 5-Column Legend */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-heading flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Bloom&apos;s Taxonomy Cognitive Levels
            </h2>
            <span className="text-xs text-slate-400 font-medium">Standardized Evaluation Hierarchy</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.values(BLOOM_INFO).map((b) => (
              <div
                key={b.code}
                className={`p-3 rounded-lg border ${b.bgLight} ${b.border}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-base font-extrabold ${b.text}`}>
                    {b.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600">
                    {b.level}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-900 mt-1 line-clamp-1">
                  {b.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Criticality 3-Card Legend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(CRITICALITY_CONFIG).map(([key, config]) => (
            <div
              key={key}
              className={`rounded-xl border p-4.5 shadow-xs ${config.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                  {config.label}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/70 border border-current">
                  {config.scoreRange}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed opacity-90 font-medium">
                {config.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Skill Cards Sorted Descending */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 font-heading">
              Skill Benchmarks &amp; Curricula Roadmaps
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Sorted by Target Level (Highest to Lowest)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

