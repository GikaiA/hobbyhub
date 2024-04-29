import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tqitkrlbhsobsahgfhem.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxaXRrcmxiaHNvYnNhaGdmaGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMDAyNTIsImV4cCI6MjAyOTY3NjI1Mn0.gYcJHIRroaQnKwRfULrXdHPkmu8HVlFz4QbWdSDh9Lw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;