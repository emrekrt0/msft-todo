import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    'https://jopuhrloekkmoytnujmb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcHVocmxvZWtrbW95dG51am1iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzIzODg5MywiZXhwIjoyMDE4ODE0ODkzfQ.BKG_xrrxE5mqHIqkD3q0pVHyE4cXyE0ZhQ1YGiXl5-I'
);

export default supabase;