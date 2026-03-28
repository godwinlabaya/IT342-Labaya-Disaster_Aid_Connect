import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hqbtxuyddootzoyummci.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxYnR4dXlkZG9vdHpveXVtbWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MjM5MDUsImV4cCI6MjA5MDI5OTkwNX0.i0zWJ-YyNd5Jwd8Xc0zA8llzhncocF7QJc3I1a8U-o4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);