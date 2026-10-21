import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Default project credentials guarantee Vercel & preview builds connect directly to the database
const DEFAULT_SUPABASE_URL = 'https://afexsqcqcawqfwxyxpjj.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZXhzcWNxY2F3cWZ3eHl4cGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxMjc5MTYsImV4cCI6MjEwNzcwMzkxNn0.zfVzprfDQX06EYl6IDwNXA_fRTX0K1dj1UBKoROgcfY';

let rawUrl = (import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL).trim().replace(/^["']|["']$/g, '').replace(/\/+$/, '');
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY).trim().replace(/^["']|["']$/g, '');

// Auto-correct if user accidentally pastes dashboard URL instead of API URL
if (rawUrl.includes('supabase.com/dashboard/project/')) {
  const match = rawUrl.match(/\/project\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    rawUrl = `https://${match[1]}.supabase.co`;
  }
}

// In unit test runner (Vitest), disable live network calls to ensure fast deterministic local tests
export const isSupabaseConfigured = Boolean(
  import.meta.env.MODE !== 'test' &&
  rawUrl &&
  supabaseAnonKey &&
  rawUrl !== '' &&
  supabaseAnonKey !== ''
);

export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured ? rawUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
