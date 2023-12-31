export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      environments: {
        Row: {
          apiToken: string | null
          createdAt: string
          envId: string
          name: string
          projectId: string
        }
        Insert: {
          apiToken?: string | null
          createdAt?: string
          envId?: string
          name: string
          projectId: string
        }
        Update: {
          apiToken?: string | null
          createdAt?: string
          envId?: string
          name?: string
          projectId?: string
        }
        Relationships: [
          {
            foreignKeyName: "environments_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["projectId"]
          }
        ]
      }
      features: {
        Row: {
          createdAt: string
          description: string | null
          featureId: string
          name: string
          projectId: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          featureId?: string
          name: string
          projectId: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          featureId?: string
          name?: string
          projectId?: string
        }
        Relationships: [
          {
            foreignKeyName: "features_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["projectId"]
          }
        ]
      }
      features_env_mapping: {
        Row: {
          createdAt: string
          enabled: boolean
          envId: string
          featureId: string
          projectId: string
        }
        Insert: {
          createdAt?: string
          enabled?: boolean
          envId: string
          featureId: string
          projectId: string
        }
        Update: {
          createdAt?: string
          enabled?: boolean
          envId?: string
          featureId?: string
          projectId?: string
        }
        Relationships: [
          {
            foreignKeyName: "features_env_mapping_envId_fkey"
            columns: ["envId"]
            isOneToOne: false
            referencedRelation: "environments"
            referencedColumns: ["envId"]
          },
          {
            foreignKeyName: "features_env_mapping_featureId_fkey"
            columns: ["featureId"]
            isOneToOne: false
            referencedRelation: "features"
            referencedColumns: ["featureId"]
          },
          {
            foreignKeyName: "features_env_mapping_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["projectId"]
          }
        ]
      }
      projects: {
        Row: {
          createdAt: string
          name: string
          projectId: string
          userId: string
        }
        Insert: {
          createdAt?: string
          name: string
          projectId?: string
          userId: string
        }
        Update: {
          createdAt?: string
          name?: string
          projectId?: string
          userId?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
