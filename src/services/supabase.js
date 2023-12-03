import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jdhejdhbcuvgywmvzgmk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkaGVqZGhiY3V2Z3l3bXZ6Z21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk3MjMwOTUsImV4cCI6MjAxNTI5OTA5NX0.Z6NWGl7yw3sUp5-sFq6oFJqU30Xo59tt_jjnaWZyA6Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
