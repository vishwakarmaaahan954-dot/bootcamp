# JSS Academy Of Technical Education Companies Research & Placement Analytics Portal
*(a.k.a. JSS Academy Of Technical Education Placement Intelligence Hub)*

**College Name:** JSS Academy Of Technical Education  
**Short Name:** JSS NOIDA  

---

## 📌 Phase 1 Overview — UI-Only Intelligence Portal

This portal is a mobile-first, enterprise-grade Single Page Application (SPA) built for students, placement cells, and recruiters at **JSS Academy Of Technical Education (JSS NOIDA)**.

### 1. Architectural Scope & Data Layer
- **Phase 1 is strictly UI-Only with Seed Data**: There is no database or Supabase client in Phase 1. All data is read from the structured reference dataset in `src/data/seedCompanies.ts` (populated with complete enterprise data for Accenture plc).
- **Zero-Friction Phase 2 Supabase Migration**: All data transformations pass through pure normalizer functions in `src/lib/companyData.ts` (`normalizeCompanySummary`, `normalizeCompanyProfile`, `normalizeDashboardSkills`). These accept the exact `short_json` and `full_json` JSONB column shapes planned for the Phase 2 database schema. Moving to Supabase will only require updating the fetch hook to supply these same JSON shapes to the normalizers.

### 2. Mandatory Hard Constraints Adhered To
- **Fully Public Access (No Login)**: Every route is directly reachable by students without authentication barriers. There is no `/login` route, no `AuthContext`, no `ProtectedRoute`, and no logout action.
- **No College Logo Assets**: In strict compliance with guidelines, there are no raster or vector image files for the college in `public/` and no `<img>` tag references to the college. The header and hero use text-only branding: the **JSS Academy Of Technical Education** wordmark and a stylized **"JSS NOIDA · INTELLIGENCE PLATFORM"** pill. Recruiting partner logos (e.g., via Logo.dev or official URLs) are supported for recruiting companies.
- **Strict Privacy / Policy Compliance**: CTC, Stipend, and Selection Ratio metrics are completely excluded across all 22 intelligence sections, cards, and skill metrics.
- **Clean Google Workspace / Enterprise SaaS Aesthetic**:
  - Sidebar background: `#F8FAFC`, border: `#E5E7EB`, text: `#334155`
  - Active navigation: `#2563EB` text on `#EFF6FF` background
  - Main background: `#FFFFFF` with minimal shadows and clean borders
  - Exact Category hex values: Super Dream `#7c3aed`, Dream `#2563eb`, Standard `#16a34a`, Regular `#d97706`
  - Exact Bloom Cognitive Level colors: CU `#3b82f6`, AP `#22c55e`, AS `#eab308`, EV `#ef4444`, CR `#a855f7`
  - Google Fonts: **Outfit** for headings (`font-heading`), **Inter** for body text (`font-body`)

---

## ⚡ Phase 2 — Supabase Data Connection

To connect the application to your live Supabase database:

1. Paste `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` into `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
2. Run:
   ```bash
   npm install && npm run dev
   ```

### Database Architecture
- **Company Data (`public.company_json`)**: Only this table is queried for company data (avoiding joins across 90+ normalized tables).
  - Cards & Directory: `SELECT company_id, short_json FROM company_json`
  - Detail Profile: `SELECT company_id, short_json, full_json FROM company_json WHERE company_id = :id`
- **Skill Competency Data**: Loaded from the 4 standard skill tables:
  - `public.company_skill_levels`
  - `public.skill_set_master`
  - `public.proficiency_levels`
  - `public.skill_set_topics`
- **Fallback**: If `.env` is unconfigured, the application gracefully renders using the documented seed dataset fallback.

---

## 🧭 Routes & Navigation Hierarchy

The application strictly implements nested React Router 6 routes:

```tsx
<Route path="/" element={<Index />} />

<Route path="/company" element={<AppLayout />}>
  <Route index element={<Navigate to="intelligence" replace />} />
  <Route path="intelligence" element={<CompanyIntelligence />} />
  <Route path="skills" element={<SkillIntelligence />} />
</Route>

<Route path="*" element={<NotFound />} />
```

- `/`: Company research directory with live search (200ms debounce), filter pills with live counts, and company cards.
- `/company`: Automatically redirects to `/company/intelligence`.
- `/company/intelligence`: 22 deep-dive intelligence sections with a sticky top info bar, synchronized sticky 22-tab bar with scroll-spy, and auto-centering.
- `/company/skills`: 12-skill radar and curriculum ladder with 5-column Bloom's taxonomy legend, 3-card Criticality legend, and expandable 10-level roadmaps featuring "Beyond scope" locks above target requirements.
- `*`: `NotFound` view strictly reserved for unmatched URLs.

### Context Persistence & Route Guard
- Selected company details (`companyId`, `companyName`, `logoUrl`) persist in `localStorage` under the key `"selected-company"`.
- Browser refresh on `/company/intelligence` or `/company/skills` safely restores company data from `localStorage` + `SEED_COMPANIES`.
- If no company has been selected or restored, routes automatically redirect to `/`.

---

## 📊 The 22 Intelligence Sections (in exact order)

1. **Company Identity**
2. **Overview & Vision**
3. **Leadership**
4. **Funding & Financials**
5. **Global Presence**
6. **Products & Services**
7. **Technology Stack**
8. **Partnerships & Ecosystem**
9. **Competitive Landscape**
10. **Market Opportunity**
11. **Core Value Proposition & ESG**
12. **Culture & Work Life**
13. **Recent News & Milestones**
14. **Sales & Customer Metrics**
15. **Risk & Compliance**
16. **Work Location & Commute**
17. **Safety & Wellbeing**
18. **Career Growth & Learning**
19. **Brand & Reputation**
20. **Compensation & Benefits** *(Excluded: CTC, Stipend, Selection Ratio)*
21. **Digital Presence & Ratings**
22. **Contact Information**

---

## 🛠️ Tech Stack & Scripts

- **React 18** + **Vite 5** + **TypeScript**
- **Tailwind CSS v3** (with custom tokens & keyframe animations)
- **React Router 6**
- **@tanstack/react-query 5**
- **lucide-react** icons
- **Vitest** for unit testing

### Available Commands
```bash
npm run dev      # Start Vite local development server
npm run build    # Run TypeScript compiler check and build bundle
npm run test     # Run Vitest test suite
npm run preview  # Preview production build locally
```

