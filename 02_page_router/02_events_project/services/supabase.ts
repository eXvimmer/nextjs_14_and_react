import { createClient } from "@supabase/supabase-js";
import { IDatabase } from "@/types";

export const supabaseUrl = "https://anhkypjtqmydzvnsocsd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuaGt5cGp0cW15ZHp2bnNvY3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3NjE5OTMsImV4cCI6MjAxNjMzNzk5M30.djWTUKXGOJ1WrkVq92PzunT07r-5f8X4X-btpRLvruI";
const supabase = createClient<IDatabase>(supabaseUrl, supabaseKey);

export default supabase;
