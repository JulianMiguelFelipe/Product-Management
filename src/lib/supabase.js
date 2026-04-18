// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// 1. Grab the keys from your .env.local file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 2. Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);