import { createClient, SupabaseClient } from '@supabase/supabase-js';

let rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

// Auto-correct if user accidentally pastes dashboard URL instead of API URL
if (rawUrl.includes('supabase.com/dashboard/project/')) {
  const match = rawUrl.match(/\/project\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    rawUrl = `https://${match[1]}.supabase.co`;
  }
}

// In unit tests, disable live network calls to ensure deterministic offline testing
export const isSupabaseConfigured = Boolean(
  import.meta.env.MODE !== 'test' &&
  rawUrl &&
  supabaseAnonKey &&
  rawUrl !== '' &&
  supabaseAnonKey !== ''
);

if (!isSupabaseConfigured && import.meta.env.MODE !== 'test') {
  console.error(
    '[Supabase Client] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Please provide your Supabase URL and anon key in the .env file.'
  );
}

// Fallback placeholder URL prevents createClient from crashing if .env is not yet configured
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
