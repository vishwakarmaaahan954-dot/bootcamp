import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '@/App';
import { SEED_COMPANIES } from '@/data/seedCompanies';

describe('Mandatory Routing & Interaction Validation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Index page on "/" with the college hero and Accenture card', async () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    // Check Hero title
    expect(
      screen.getByText(/JSS Academy Of Technical Education Companies Research & Placement Analytics Portal/i)
    ).toBeInTheDocument();

    // Check college pill
    expect(
      screen.getByText(/JSS NOIDA · INTELLIGENCE PLATFORM/i)
    ).toBeInTheDocument();

    // Check Accenture card is visible (wait for initial skeleton timeout)
    const accentureText = await screen.findByText('Accenture plc');
    expect(accentureText).toBeInTheDocument();
    expect(screen.getByText('Explore Intelligence')).toBeInTheDocument();
  });

  it('clicking company card saves to localStorage and navigates to /company/intelligence', async () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    const accentureText = await screen.findByText('Accenture plc');
    const card = accentureText.closest('div[role="button"]');
    expect(card).not.toBeNull();
    if (card) {
      fireEvent.click(card);
    }

    // Verify localStorage has selected-company
    const stored = localStorage.getItem('selected-company');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.companyId).toBe(1);
    expect(parsed.companyName).toBe('Accenture plc');

    // Verify Company Intelligence loaded
    await waitFor(() => {
      expect(window.location.pathname).toBe('/company/intelligence');
    });
  });

  it('visiting /company directly redirects to /company/intelligence', async () => {
    const accenture = SEED_COMPANIES[0];
    localStorage.setItem(
      'selected-company',
      JSON.stringify({
        companyId: accenture.company_id,
        companyName: accenture.short_json.name,
        logoUrl: accenture.short_json.logo_url,
      })
    );

    window.history.pushState({}, '', '/company');
    render(<App />);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/company/intelligence');
    });
  });

  it('simulates page reload on /company/skills and confirms company data is preserved', async () => {
    const accenture = SEED_COMPANIES[0];
    localStorage.setItem(
      'selected-company',
      JSON.stringify({
        companyId: accenture.company_id,
        companyName: accenture.short_json.name,
        logoUrl: accenture.short_json.logo_url,
      })
    );

    window.history.pushState({}, '', '/company/skills');
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Accenture Skill Intelligence/i)).toBeInTheDocument();
      expect(screen.getByText(/Data Structures & Algorithms/i)).toBeInTheDocument();
    });
  });

  it('renders NotFound ONLY for invalid routes', async () => {
    window.history.pushState({}, '', '/invalid-route-xyz');
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
      expect(screen.getByText(/Error 404/i)).toBeInTheDocument();
    });
  });

  it('redirects to "/" if /company/intelligence visited without selected-company', async () => {
    localStorage.clear();
    window.history.pushState({}, '', '/company/intelligence');
    render(<App />);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });
});

