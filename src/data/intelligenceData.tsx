import {
  Building2,
  Compass,
  Users,
  CircleDollarSign,
  Globe2,
  Package,
  Cpu,
  Handshake,
  Swords,
  TrendingUp,
  Award,
  HeartHandshake,
  Newspaper,
  BarChart3,
  ShieldAlert,
  MapPin,
  HeartPulse,
  GraduationCap,
  Sparkles,
  Gift,
  Share2,
  Mail,
  LucideIcon,
} from 'lucide-react';
import { CompanyProfile } from '@/lib/companyData';

export interface IntelligenceField {
  key: string;
  label: string;
  value?: any;
  type?: 'text' | 'url' | 'list' | 'rating' | 'video';
  description?: string;
}

export interface IntelligenceSection {
  id: string;
  title: string;
  icon: LucideIcon;
  fields: IntelligenceField[];
}

export function buildIntelligenceSections(profile?: CompanyProfile | null): IntelligenceSection[] {
  const data: Record<string, any> = profile?.raw || {};
  const summary = profile?.summary;

  const getVal = (key: string, fallbackKey?: string) => {
    if (data[key] !== undefined && data[key] !== null) return data[key];
    if (fallbackKey && data[fallbackKey] !== undefined && data[fallbackKey] !== null) return data[fallbackKey];
    if (summary && (summary as any)[key] !== undefined) return (summary as any)[key];
    return null;
  };

  const sections: IntelligenceSection[] = [
    // 1. Company Identity
    {
      id: 'company-identity',
      title: 'Company Identity',
      icon: Building2,
      fields: [
        { key: 'name', label: 'Company Name', value: getVal('name') },
        { key: 'short_name', label: 'Short Name', value: getVal('short_name') },
        { key: 'nature_of_company', label: 'Nature of Company', value: getVal('nature_of_company') },
        { key: 'category', label: 'Industry Category', value: getVal('category') },
        { key: 'company_type', label: 'Placement Category', value: getVal('company_type') },
        { key: 'incorporation_year', label: 'Incorporation Year', value: getVal('incorporation_year') },
      ],
    },
    // 2. Overview & Vision
    {
      id: 'overview-vision',
      title: 'Overview & Vision',
      icon: Compass,
      fields: [
        { key: 'overview_text', label: 'Executive Overview', value: getVal('overview_text') },
        { key: 'vision_statement', label: 'Vision Statement', value: getVal('vision_statement') },
        { key: 'mission_statement', label: 'Mission Statement', value: getVal('mission_statement') },
        { key: 'core_values', label: 'Core Values & Principles', value: getVal('core_values'), type: 'list' },
        { key: 'history_timeline', label: 'Historical Milestones', value: getVal('history_timeline'), type: 'list' },
      ],
    },
    // 3. Leadership
    {
      id: 'leadership',
      title: 'Leadership',
      icon: Users,
      fields: [
        { key: 'ceo_name', label: 'Chief Executive Officer (CEO)', value: getVal('ceo_name') },
        { key: 'ceo_linkedin_url', label: 'CEO LinkedIn Profile', value: getVal('ceo_linkedin_url'), type: 'url' },
        { key: 'key_leaders', label: 'Executive Leadership Team', value: getVal('key_leaders'), type: 'list' },
        { key: 'board_members', label: 'Board of Directors', value: getVal('board_members'), type: 'list' },
        { key: 'warm_intro_pathways', label: 'Warm Intro & Alumni Pathways', value: getVal('warm_intro_pathways') },
        { key: 'decision_maker_access', label: 'Decision Maker Accessibility', value: getVal('decision_maker_access') },
      ],
    },
    // 4. Funding & Financials
    {
      id: 'funding-financials',
      title: 'Funding & Financials',
      icon: CircleDollarSign,
      fields: [
        { key: 'annual_revenue', label: 'Annual Revenue', value: getVal('annual_revenue') },
        { key: 'annual_profit', label: 'Annual Net Profit', value: getVal('annual_profit') },
        { key: 'revenue_mix', label: 'Revenue Streams Mix', value: getVal('revenue_mix') },
        { key: 'valuation', label: 'Market Capitalization / Valuation', value: getVal('valuation') },
        { key: 'yoy_growth_rate', label: 'YoY Growth Rate', value: getVal('yoy_growth_rate') },
        { key: 'profitability_status', label: 'Profitability Status', value: getVal('profitability_status') },
        { key: 'key_investors', label: 'Key Institutional Investors', value: getVal('key_investors'), type: 'list' },
        { key: 'recent_funding_rounds', label: 'Capitalization & Funding Rounds', value: getVal('recent_funding_rounds') },
        { key: 'total_capital_raised', label: 'Total Capital Raised', value: getVal('total_capital_raised') },
        { key: 'burn_rate', label: 'Burn Rate', value: getVal('burn_rate') },
        { key: 'runway_months', label: 'Cash Runway', value: getVal('runway_months') },
        { key: 'burn_multiplier', label: 'Burn Multiplier', value: getVal('burn_multiplier') },
      ],
    },
    // 5. Global Presence
    {
      id: 'global-presence',
      title: 'Global Presence',
      icon: Globe2,
      fields: [
        { key: 'headquarters_address', label: 'Global Headquarters', value: getVal('headquarters_address') },
        { key: 'office_count', label: 'Total Office Count', value: getVal('office_count') },
        { key: 'office_locations', label: 'Key Office Hubs', value: getVal('office_locations'), type: 'list' },
        { key: 'operating_countries', label: 'Operating Countries', value: getVal('operating_countries'), type: 'list' },
        { key: 'employee_size', label: 'Global Workforce Size', value: getVal('employee_size') },
      ],
    },
    // 6. Products & Services
    {
      id: 'products-services',
      title: 'Products & Services',
      icon: Package,
      fields: [
        { key: 'offerings_description', label: 'Core Product & Service Offerings', value: getVal('offerings_description'), type: 'list' },
        { key: 'pain_points_addressed', label: 'Enterprise Pain Points Solved', value: getVal('pain_points_addressed'), type: 'list' },
        { key: 'focus_sectors', label: 'Target Industry Verticals', value: getVal('focus_sectors'), type: 'list' },
        { key: 'top_customers', label: 'Marquee Clients & Enterprise Customers', value: getVal('top_customers'), type: 'list' },
        { key: 'product_pipeline', label: 'Active Product Pipeline', value: getVal('product_pipeline') },
        { key: 'case_studies', label: 'Flagship Client Case Studies', value: getVal('case_studies'), type: 'list' },
      ],
    },
    // 7. Technology Stack
    {
      id: 'technology-stack',
      title: 'Technology Stack',
      icon: Cpu,
      fields: [
        { key: 'tech_stack', label: 'Core Technology Stack & Platforms', value: getVal('tech_stack'), type: 'list' },
        { key: 'technology_partners', label: 'Technology Alliances', value: getVal('technology_partners'), type: 'list' },
        { key: 'ai_ml_adoption_level', label: 'AI & Machine Learning Adoption', value: getVal('ai_ml_adoption_level') },
        { key: 'tech_adoption_rating', label: 'Tech Innovation & Adoption Rating', value: getVal('tech_adoption_rating') },
        { key: 'r_and_d_investment', label: 'Annual R&D Investment', value: getVal('r_and_d_investment') },
        { key: 'intellectual_property', label: 'Intellectual Property & Patents', value: getVal('intellectual_property'), type: 'list' },
        { key: 'cybersecurity_posture', label: 'Cybersecurity Posture & Certifications', value: getVal('cybersecurity_posture') },
      ],
    },
    // 8. Partnerships & Ecosystem
    {
      id: 'partnerships-ecosystem',
      title: 'Partnerships & Ecosystem',
      icon: Handshake,
      fields: [
        { key: 'partnership_ecosystem', label: 'Strategic Alliance Ecosystem', value: getVal('partnership_ecosystem'), type: 'list' },
        { key: 'technology_partners', label: 'Hyperscaler & Software Partners', value: getVal('technology_partners'), type: 'list' },
        { key: 'industry_associations', label: 'Industry Consortiums & Memberships', value: getVal('industry_associations'), type: 'list' },
      ],
    },
    // 9. Competitive Landscape
    {
      id: 'competitive-landscape',
      title: 'Competitive Landscape',
      icon: Swords,
      fields: [
        { key: 'key_competitors', label: 'Direct Competitors', value: getVal('key_competitors'), type: 'list' },
        { key: 'market_share_percentage', label: 'Estimated Market Share', value: getVal('market_share_percentage') },
        { key: 'competitive_advantages', label: 'Sustainable Competitive Advantages', value: getVal('competitive_advantages'), type: 'list' },
        { key: 'unique_differentiators', label: 'Unique Moats & Differentiators', value: getVal('unique_differentiators'), type: 'list' },
        { key: 'weaknesses_gaps', label: 'Identified Weaknesses & Gaps', value: getVal('weaknesses_gaps'), type: 'list' },
        { key: 'benchmark_vs_peers', label: 'Performance Benchmark vs Peers', value: getVal('benchmark_vs_peers') },
        { key: 'key_challenges_needs', label: 'Strategic Challenges & Industry Pressures', value: getVal('key_challenges_needs'), type: 'list' },
      ],
    },
    // 10. Market Opportunity
    {
      id: 'market-opportunity',
      title: 'Market Opportunity',
      icon: TrendingUp,
      fields: [
        { key: 'tam', label: 'Total Addressable Market (TAM)', value: getVal('tam') },
        { key: 'sam', label: 'Serviceable Addressable Market (SAM)', value: getVal('sam') },
        { key: 'som', label: 'Serviceable Obtainable Market (SOM)', value: getVal('som') },
        { key: 'future_projections', label: 'Future Growth Projections', value: getVal('future_projections') },
        { key: 'strategic_priorities', label: 'Long-term Strategic Priorities', value: getVal('strategic_priorities'), type: 'list' },
        { key: 'go_to_market_strategy', label: 'Go-To-Market (GTM) Strategy', value: getVal('go_to_market_strategy') },
        { key: 'innovation_roadmap', label: 'Innovation Roadmap', value: getVal('innovation_roadmap'), type: 'list' },
        { key: 'exit_strategy_history', label: 'Corporate Maturity & Acquisition Profile', value: getVal('exit_strategy_history') },
      ],
    },
    // 11. Core Value Proposition & ESG
    {
      id: 'core-value-proposition-esg',
      title: 'Core Value Proposition & ESG',
      icon: Award,
      fields: [
        { key: 'core_value_proposition', label: 'Core Enterprise Value Proposition', value: getVal('core_value_proposition'), type: 'list' },
        { key: 'esg_ratings', label: 'ESG Framework & Sustainability Ratings', value: getVal('esg_ratings'), type: 'list' },
        { key: 'sustainability_csr', label: 'CSR & Environmental Initiatives', value: getVal('sustainability_csr'), type: 'list' },
        { key: 'carbon_footprint', label: 'Carbon Neutrality & Energy Targets', value: getVal('carbon_footprint') },
        { key: 'ethical_sourcing', label: 'Ethical Sourcing & Supplier Audit', value: getVal('ethical_sourcing') },
        { key: 'ethical_standards', label: 'Compliance & Ethical Standards', value: getVal('ethical_standards') },
      ],
    },
    // 12. Culture & Work Life
    {
      id: 'culture-work-life',
      title: 'Culture & Work Life',
      icon: HeartHandshake,
      fields: [
        { key: 'work_culture_summary', label: 'Work Culture Summary', value: getVal('work_culture_summary'), type: 'list' },
        { key: 'manager_quality', label: 'Managerial & Coaching Quality', value: getVal('manager_quality') },
        { key: 'psychological_safety', label: 'Psychological Safety Score', value: getVal('psychological_safety') },
        { key: 'feedback_culture', label: 'Performance Feedback Culture', value: getVal('feedback_culture') },
        { key: 'diversity_metrics', label: 'Diversity & Gender Representation', value: getVal('diversity_metrics') },
        { key: 'diversity_inclusion_score', label: 'DEI Leadership Initiatives', value: getVal('diversity_inclusion_score') },
        { key: 'burnout_risk', label: 'Workload & Burnout Risk Index', value: getVal('burnout_risk') },
        { key: 'mission_clarity', label: 'Mission Alignment & Clarity', value: getVal('mission_clarity') },
        { key: 'crisis_behavior', label: 'Leadership Behavior in Crisis', value: getVal('crisis_behavior') },
        { key: 'layoff_history', label: 'Restructuring & Layoff History', value: getVal('layoff_history') },
      ],
    },
    // 13. Recent News & Milestones
    {
      id: 'recent-news-milestones',
      title: 'Recent News & Milestones',
      icon: Newspaper,
      fields: [
        { key: 'recent_news', label: 'Recent News & Announcements', value: getVal('recent_news'), type: 'list' },
        { key: 'history_timeline', label: 'Major Institutional Milestones', value: getVal('history_timeline'), type: 'list' },
      ],
    },
    // 14. Sales & Customer Metrics
    {
      id: 'sales-customer-metrics',
      title: 'Sales & Customer Metrics',
      icon: BarChart3,
      fields: [
        { key: 'sales_motion', label: 'Enterprise Sales Motion', value: getVal('sales_motion') },
        { key: 'customer_acquisition_cost', label: 'Customer Acquisition Cost (CAC)', value: getVal('customer_acquisition_cost') },
        { key: 'customer_lifetime_value', label: 'Customer Lifetime Value (LTV)', value: getVal('customer_lifetime_value') },
        { key: 'cac_ltv_ratio', label: 'CAC : LTV Ratio', value: getVal('cac_ltv_ratio') },
        { key: 'churn_rate', label: 'Annual Client Churn Rate', value: getVal('churn_rate') },
        { key: 'net_promoter_score', label: 'Net Promoter Score (NPS)', value: getVal('net_promoter_score') },
        { key: 'customer_concentration_risk', label: 'Customer Concentration Risk', value: getVal('customer_concentration_risk') },
      ],
    },
    // 15. Risk & Compliance
    {
      id: 'risk-compliance',
      title: 'Risk & Compliance',
      icon: ShieldAlert,
      fields: [
        { key: 'regulatory_status', label: 'Industry & Regulatory Certifications', value: getVal('regulatory_status'), type: 'list' },
        { key: 'legal_issues', label: 'Litigation & Compliance History', value: getVal('legal_issues') },
        { key: 'supply_chain_dependencies', label: 'Key Supply Chain Dependencies', value: getVal('supply_chain_dependencies'), type: 'list' },
        { key: 'geopolitical_risks', label: 'Geopolitical & Policy Exposure', value: getVal('geopolitical_risks'), type: 'list' },
        { key: 'macro_risks', label: 'Macroeconomic & Cyclical Risks', value: getVal('macro_risks'), type: 'list' },
      ],
    },
    // 16. Work Location & Commute
    {
      id: 'work-location-commute',
      title: 'Work Location & Commute',
      icon: MapPin,
      fields: [
        { key: 'remote_policy_details', label: 'Workplace Remote / Hybrid Policy', value: getVal('remote_policy_details') },
        { key: 'flexibility_level', label: 'Working Flexibility', value: getVal('flexibility_level') },
        { key: 'typical_hours', label: 'Standard Working Hours', value: getVal('typical_hours') },
        { key: 'overtime_expectations', label: 'Overtime & Crunch Expectations', value: getVal('overtime_expectations') },
        { key: 'weekend_work', label: 'Weekend Work Frequency', value: getVal('weekend_work') },
        { key: 'location_centrality', label: 'Office Accessibility & Urban Centrality', value: getVal('location_centrality') },
        { key: 'public_transport_access', label: 'Public Transit Connectivity', value: getVal('public_transport_access') },
        { key: 'cab_policy', label: 'Corporate Cab & Transport Policy', value: getVal('cab_policy') },
        { key: 'airport_commute_time', label: 'Commute Time to Airport', value: getVal('airport_commute_time') },
        { key: 'office_zone_type', label: 'Office Zone Type', value: getVal('office_zone_type') },
      ],
    },
    // 17. Safety & Wellbeing
    {
      id: 'safety-wellbeing',
      title: 'Safety & Wellbeing',
      icon: HeartPulse,
      fields: [
        { key: 'area_safety', label: 'Office Area Safety Rating', value: getVal('area_safety') },
        { key: 'safety_policies', label: 'Employee Safety Protocols & Transport', value: getVal('safety_policies'), type: 'list' },
        { key: 'infrastructure_safety', label: 'Facility & Building Safety Compliance', value: getVal('infrastructure_safety') },
        { key: 'emergency_preparedness', label: 'Emergency & Medical Preparedness', value: getVal('emergency_preparedness') },
        { key: 'health_support', label: 'Wellness & Preventive Health Programs', value: getVal('health_support'), type: 'list' },
      ],
    },
    // 18. Career Growth & Learning
    {
      id: 'career-growth-learning',
      title: 'Career Growth & Learning',
      icon: GraduationCap,
      fields: [
        { key: 'training_spend', label: 'Annual Training Investment Per Employee', value: getVal('training_spend') },
        { key: 'onboarding_quality', label: 'Campus Hire Onboarding Quality', value: getVal('onboarding_quality') },
        { key: 'learning_culture', label: 'Learning Resources & LMS Access', value: getVal('learning_culture'), type: 'list' },
        { key: 'exposure_quality', label: 'Client & Domain Exposure Quality', value: getVal('exposure_quality') },
        { key: 'mentorship_availability', label: 'Mentorship & Sponsorship Programs', value: getVal('mentorship_availability'), type: 'list' },
        { key: 'internal_mobility', label: 'Internal Mobility & Cross-team Transfers', value: getVal('internal_mobility') },
        { key: 'promotion_clarity', label: 'Promotion Criteria & Transparency', value: getVal('promotion_clarity') },
        { key: 'tools_access', label: 'Enterprise Tools & Hardware Access', value: getVal('tools_access') },
        { key: 'role_clarity', label: 'Role & Responsibility Clarity', value: getVal('role_clarity') },
        { key: 'early_ownership', label: 'Early Engineering Ownership', value: getVal('early_ownership') },
        { key: 'work_impact', label: 'Direct Work Impact & Visibility', value: getVal('work_impact') },
        { key: 'execution_thinking_balance', label: 'Execution vs Strategic Thinking Balance', value: getVal('execution_thinking_balance') },
        { key: 'automation_level', label: 'Process Automation & Tooling Maturity', value: getVal('automation_level') },
        { key: 'cross_functional_exposure', label: 'Cross-functional Collaboration Exposure', value: getVal('cross_functional_exposure'), type: 'list' },
        { key: 'company_maturity', label: 'Organizational Maturity Level', value: getVal('company_maturity') },
        { key: 'brand_value', label: 'Resume & Brand Value', value: getVal('brand_value') },
        { key: 'client_quality', label: 'Client Tier & Engagement Caliber', value: getVal('client_quality') },
        { key: 'exit_opportunities', label: 'Alumni Placement & Exit Horizons', value: getVal('exit_opportunities'), type: 'list' },
        { key: 'skill_relevance', label: 'Industry Skill Relevance Index', value: getVal('skill_relevance') },
        { key: 'external_recognition', label: 'External Market Recognition', value: getVal('external_recognition') },
        { key: 'network_strength', label: 'Alumni Network Strength', value: getVal('network_strength') },
        { key: 'global_exposure', label: 'International Teams & Global Exposure', value: getVal('global_exposure') },
        { key: 'hiring_velocity', label: 'Hiring Velocity & Department Demand', value: getVal('hiring_velocity'), type: 'list' },
        { key: 'employee_turnover', label: 'Annual Employee Turnover Rate', value: getVal('employee_turnover') },
        { key: 'avg_retention_tenure', label: 'Average Employee Retention Tenure', value: getVal('avg_retention_tenure') },
      ],
    },
    // 19. Brand & Reputation
    {
      id: 'brand-reputation',
      title: 'Brand & Reputation',
      icon: Sparkles,
      fields: [
        { key: 'awards_recognitions', label: 'Industry Awards & Recognitions', value: getVal('awards_recognitions'), type: 'list' },
        { key: 'brand_sentiment_score', label: 'Global Brand Sentiment & Perception', value: getVal('brand_sentiment_score') },
        { key: 'customer_testimonials', label: 'Client Endorsements & Proof Points', value: getVal('customer_testimonials'), type: 'list' },
        { key: 'marketing_video_url', label: 'Corporate Video Overview', value: getVal('marketing_video_url'), type: 'video' },
        { key: 'event_participation', label: 'Global Tech Summits & Keynote Presence', value: getVal('event_participation'), type: 'list' },
      ],
    },
    // 20. Compensation & Benefits (NO CTC, NO Stipend, NO Selection Ratio)
    {
      id: 'compensation-benefits',
      title: 'Compensation & Benefits',
      icon: Gift,
      fields: [
        { key: 'leave_policy', label: 'Annual Leave & Mental Wellness Days', value: getVal('leave_policy'), type: 'list' },
        { key: 'health_support', label: 'Comprehensive Health & Medical Cover', value: getVal('health_support'), type: 'list' },
        { key: 'fixed_vs_variable_pay', label: 'Fixed vs Performance Structure', value: getVal('fixed_vs_variable_pay') },
        { key: 'bonus_predictability', label: 'Performance Bonus Predictability', value: getVal('bonus_predictability') },
        { key: 'esops_incentives', label: 'Equity Grants & Stock Incentive Units', value: getVal('esops_incentives'), type: 'list' },
        { key: 'family_health_insurance', label: 'Dependent & Family Healthcare Scheme', value: getVal('family_health_insurance'), type: 'list' },
        { key: 'relocation_support', label: 'Relocation & Housing Allowance Assistance', value: getVal('relocation_support'), type: 'list' },
        { key: 'lifestyle_benefits', label: 'Lifestyle, Fitness & Per-diem Perks', value: getVal('lifestyle_benefits'), type: 'list' },
      ],
    },
    // 21. Digital Presence & Ratings
    {
      id: 'digital-presence-ratings',
      title: 'Digital Presence & Ratings',
      icon: Share2,
      fields: [
        { key: 'website_url', label: 'Official Portal', value: getVal('website_url'), type: 'url' },
        { key: 'linkedin_url', label: 'LinkedIn Company Page', value: getVal('linkedin_url'), type: 'url' },
        { key: 'twitter_handle', label: 'X / Twitter Handle', value: getVal('twitter_handle') },
        { key: 'facebook_url', label: 'Facebook Page', value: getVal('facebook_url'), type: 'url' },
        { key: 'instagram_url', label: 'Instagram Profile', value: getVal('instagram_url'), type: 'url' },
        { key: 'glassdoor_rating', label: 'Glassdoor Rating', value: getVal('glassdoor_rating'), type: 'rating' },
        { key: 'indeed_rating', label: 'Indeed Rating', value: getVal('indeed_rating'), type: 'rating' },
        { key: 'google_rating', label: 'Google Review Score', value: getVal('google_rating'), type: 'rating' },
        { key: 'social_media_followers', label: 'Global Social Media Followers', value: getVal('social_media_followers') },
        { key: 'website_traffic_rank', label: 'Global Traffic Rank', value: getVal('website_traffic_rank') },
        { key: 'website_quality', label: 'Digital Brand Experience & UX', value: getVal('website_quality') },
        { key: 'website_rating', label: 'Website Rating', value: getVal('website_rating') },
      ],
    },
    // 22. Contact Information
    {
      id: 'contact-information',
      title: 'Contact Information',
      icon: Mail,
      fields: [
        { key: 'contact_person_name', label: 'Executive Point of Contact', value: getVal('contact_person_name') },
        { key: 'contact_person_title', label: 'Contact Designation / Role', value: getVal('contact_person_title') },
        { key: 'contact_person_email', label: 'Direct Communication Email', value: getVal('contact_person_email', 'primary_contact_email'), type: 'text' },
        { key: 'contact_person_phone', label: 'Direct Contact Phone', value: getVal('contact_person_phone', 'primary_phone_number') },
        { key: 'headquarters_address', label: 'Registered Office Address', value: getVal('headquarters_address') },
      ],
    },
  ];

  return sections;
}

