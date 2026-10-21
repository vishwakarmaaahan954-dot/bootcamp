import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { CompanyProvider } from '@/context/CompanyContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { Index } from '@/pages/Index';
import { CompanyIntelligence } from '@/pages/CompanyIntelligence';
import { SkillIntelligence } from '@/pages/SkillIntelligence';
import { NotFound } from '@/pages/NotFound';

// Configure QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,    // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <CompanyProvider>
          <BrowserRouter>
            <Suspense
              fallback={
                <div className="flex h-screen w-full items-center justify-center bg-white">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-600 border-t-transparent" />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Loading Hub...
                    </span>
                  </div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Index />} />

                <Route path="/company" element={<AppLayout />}>
                  <Route index element={<Navigate to="intelligence" replace />} />
                  <Route path="intelligence" element={<CompanyIntelligence />} />
                  <Route path="skills" element={<SkillIntelligence />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CompanyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

