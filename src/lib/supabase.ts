import { createClient } from '@supabase/supabase-js';


export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ADD THESE TWO LINES FOR TESTING
console.log("URL Check:", supabaseUrl);
console.log("Key Check:", supabaseAnonKey ? "Found (Starts with " + supabaseAnonKey.substring(0,5) + ")" : "NOT FOUND");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  bio: string | null;
  is_admin: boolean;
  avatar_url: string | null;
  created_at: string;
}

export interface Poem {
  id: string;
  user_id: string;
  title: string;
  content: string;
  genre: string;
  style: string;
  is_featured: boolean;
  published_at: string;
  created_at: string;
  profiles?: Profile;
}

export interface ForumPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  approved: boolean;
  created_at: string;
  profiles?: Profile;
}

export interface ForumComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: Profile;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  is_published: boolean;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  content: string;
  video_url: string | null;
  order_number: number;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed: boolean;
}



