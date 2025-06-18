export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Aquí puedes añadir tus tablas reales cuando estén definidas en Supabase
      example_table: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
