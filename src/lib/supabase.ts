import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos do banco de dados
export interface UserProfile {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  goal?: string;
  sleep_time?: string;
  wake_time?: string;
  workout_level?: string;
  daily_routine?: string;
  restrictions?: string[];
  preferences?: string[];
  available_time?: number;
  gym_experience?: string;
  diet_history?: string;
  plan_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Gamification {
  id: string;
  user_id: string;
  level: number;
  xp: number;
  vita_points: number;
  streak_days: number;
  last_activity_date?: string;
  achievements: any[];
  created_at?: string;
  updated_at?: string;
}

export interface NutritionLog {
  id: string;
  user_id: string;
  date: string;
  meal_type: string;
  food_name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  created_at?: string;
}

export interface WorkoutLog {
  id: string;
  user_id: string;
  date: string;
  workout_type: string;
  duration: number;
  calories_burned?: number;
  exercises?: any;
  notes?: string;
  created_at?: string;
}

export interface SleepLog {
  id: string;
  user_id: string;
  date: string;
  sleep_time?: string;
  wake_time?: string;
  duration_hours?: number;
  quality_score?: number;
  light_sleep_hours?: number;
  deep_sleep_hours?: number;
  rem_sleep_hours?: number;
  times_awake?: number;
  created_at?: string;
}
