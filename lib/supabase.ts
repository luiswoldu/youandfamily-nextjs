import { createClient } from "@supabase/supabase-js"

export type SubmissionSource = "apply" | "donate" | "contact"
export type SubmissionStatus = "new" | "read" | "replied" | "archived"

export interface Submission {
  id: string
  source: SubmissionSource
  name: string
  email: string
  subject: string
  message: string
  status: SubmissionStatus
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      submissions: {
        Row: Submission
        Insert: Omit<Submission, "id" | "status" | "created_at"> & {
          status?: SubmissionStatus
        }
        Update: Partial<Omit<Submission, "id" | "created_at">>
      }
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Singleton for client components
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)