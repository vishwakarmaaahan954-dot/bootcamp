import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Building2, Sparkles, ArrowLeft, Layers } from 'lucide-react';
import { useCompany } from '@/context/CompanyContext';
import { CompanyLogo } from '@/components/CompanyLogo';

interface AppSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  isMobileOpen = false,
  onCloseMobile,
  isCollapsed = false,
}) => {
  const navigate = useNavigate();
  const { summary } = useCompany();

  const navItems = [
    {
      label: 'Company Intelligence',
      to: '/company/intelligence',
      icon: Building2,
    },
    {
      label: 'Skill Intelligence',
      to: '/company/skills',
      icon: Sparkles,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between border-r transition-all duration-300 md:static ${
          isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
        } ${isCollapsed ? 'md:w-16' : 'md:w-64'} bg-[#F8FAFC] border-[#E5E7EB] text-[#334155]`}
      >
        {/* Top Header */}
        <div>
          <div className="flex h-16 items-center px-4 border-b border-[#E5E7EB] gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="font-heading font-bold text-sm text-slate-900 truncate">
                  JSS NOIDA
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Placement Hub
                </span>
              </div>
            )}
          </div>

          {/* Active Company Quick Switcher / Display */}
          {summary && !isCollapsed && (
            <div className="m-3 p-2.5 rounded-lg border border-slate-200 bg-white shadow-xs">
              <div className="flex items-center gap-2.5">
                <CompanyLogo
                  name={summary.name}
                  logoUrl={summary.logo_url}
                  size="sm"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {summary.short_name || summary.name}
                  </p>
                  <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-medium bg-blue-50 text-blue-700">
                    {summary.company_type || 'Active Profile'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                      : 'text-[#334155] hover:bg-slate-100 hover:text-slate-900'
                  } ${isCollapsed ? 'justify-center px-2' : ''}`
                }
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer: All Companies */}
        <div className="p-3 border-t border-[#E5E7EB]">
          <button
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
              navigate('/');
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors ${
              isCollapsed ? 'justify-center px-2' : ''
            }`}
            title="All Companies"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>All Companies</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

