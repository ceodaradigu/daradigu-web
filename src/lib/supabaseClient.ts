import { createClient } from '@supabase/supabase-js';

// Claves inyectadas directamente para frontend
const supabaseUrl = 'https://bbmvccqwcueeuespjlig.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJibXZjY3F3Y3VlZXVlc3BqbGlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNjY5MjgsImV4cCI6MjA2NDc0MjkyOH0.MS11K1Mhhha_GHh81_a3JtuQ4qBQWkeV2gNIGUAkieg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);