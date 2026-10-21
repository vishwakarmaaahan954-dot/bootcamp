import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, ChevronRight, Home, Building2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { AppSidebar } from './AppSidebar';
import { useCompany } from '@/context/CompanyContext';

export const AppLayout: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { selectedCompany, summary, currentCompany } = useCompany();
  const navigate = useNavigate();
  const location = useLocation();

  // Route Guard: If selected-company is missing, redirect to "/"
  useEffect(() => {
    const stored = localStorage.getItem('selected-company');
    if (!stored && !selectedCompany && !currentCompany) {
      navigate('/', { replace: true });
    }
  }, [selectedCompany, currentCompany, navigate]);

  const getSubpageName = () => {
    if (location.pathname.includes('/skills')) return 'Skill Intelligence';
    if (location.pathname.includes('/intelligence')) return 'Company Intelligence';
    return '';
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Sidebar */}
      <AppSidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile trigger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Desktop collapse toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:inline-flex items-center justify-center rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="h-5 w-5" />
              ) : (
                <PanelLeftClose className="h-5 w-5" />
              )}
            </button>

            {/* Breadcrumbs showing company name */}
            <nav className="flex items-center space-x-1.5 text-xs sm:text-sm text-slate-500 font-medium">
              <Link
                to="/"
                className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <Home className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Companies</span>
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <div className="flex items-center gap-1.5 text-slate-900 font-semibold truncate max-w-[140px] sm:max-w-xs md:max-w-sm">
                <Building2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{summary?.short_name || summary?.name || 'Company'}</span>
              </div>
              {getSubpageName() && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="text-blue-600 font-medium truncate hidden xs:inline">
                    {getSubpageName()}
                  </span>
                </>
              )}
            </nav>
          </div>

          {/* Right Header Status / Tag */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              JSS NOIDA Portal
            </span>
          </div>
        </header>

        {/* Scrollable View Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

