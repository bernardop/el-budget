export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
	graphql_public: {
		Tables: {
			[_ in never]: never
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			graphql: {
				Args: {
					operationName?: string
					query?: string
					variables?: Json
					extensions?: Json
				}
				Returns: Json
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
	public: {
		Tables: {
			budget_entrees: {
				Row: {
					amount: number
					budget_id: number
					created_at: string | null
					date: string | null
					entree_type: Database['public']['Enums']['budget_entree_type']
					id: number
					name: string
				}
				Insert: {
					amount: number
					budget_id: number
					created_at?: string | null
					date?: string | null
					entree_type: Database['public']['Enums']['budget_entree_type']
					id?: number
					name?: string
				}
				Update: {
					amount?: number
					budget_id?: number
					created_at?: string | null
					date?: string | null
					entree_type?: Database['public']['Enums']['budget_entree_type']
					id?: number
					name?: string
				}
			}
			budgets: {
				Row: {
					created_at: string | null
					id: number
					year_month: string
				}
				Insert: {
					created_at?: string | null
					id?: number
					year_month?: string
				}
				Update: {
					created_at?: string | null
					id?: number
					year_month?: string
				}
			}
			notes: {
				Row: {
					budget_entree_id: number | null
					budget_id: number | null
					content: string | null
					created_at: string | null
					id: number
				}
				Insert: {
					budget_entree_id?: number | null
					budget_id?: number | null
					content?: string | null
					created_at?: string | null
					id?: number
				}
				Update: {
					budget_entree_id?: number | null
					budget_id?: number | null
					content?: string | null
					created_at?: string | null
					id?: number
				}
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			to_year_month_text: {
				Args: {
					year_month: string
				}
				Returns: string
			}
		}
		Enums: {
			budget_entree_type: 'income' | 'fixed_expense' | 'variable_expense'
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
	storage: {
		Tables: {
			buckets: {
				Row: {
					allowed_mime_types: string[] | null
					avif_autodetection: boolean | null
					created_at: string | null
					file_size_limit: number | null
					id: string
					name: string
					owner: string | null
					public: boolean | null
					updated_at: string | null
				}
				Insert: {
					allowed_mime_types?: string[] | null
					avif_autodetection?: boolean | null
					created_at?: string | null
					file_size_limit?: number | null
					id: string
					name: string
					owner?: string | null
					public?: boolean | null
					updated_at?: string | null
				}
				Update: {
					allowed_mime_types?: string[] | null
					avif_autodetection?: boolean | null
					created_at?: string | null
					file_size_limit?: number | null
					id?: string
					name?: string
					owner?: string | null
					public?: boolean | null
					updated_at?: string | null
				}
			}
			migrations: {
				Row: {
					executed_at: string | null
					hash: string
					id: number
					name: string
				}
				Insert: {
					executed_at?: string | null
					hash: string
					id: number
					name: string
				}
				Update: {
					executed_at?: string | null
					hash?: string
					id?: number
					name?: string
				}
			}
			objects: {
				Row: {
					bucket_id: string | null
					created_at: string | null
					id: string
					last_accessed_at: string | null
					metadata: Json | null
					name: string | null
					owner: string | null
					path_tokens: string[] | null
					updated_at: string | null
				}
				Insert: {
					bucket_id?: string | null
					created_at?: string | null
					id?: string
					last_accessed_at?: string | null
					metadata?: Json | null
					name?: string | null
					owner?: string | null
					path_tokens?: string[] | null
					updated_at?: string | null
				}
				Update: {
					bucket_id?: string | null
					created_at?: string | null
					id?: string
					last_accessed_at?: string | null
					metadata?: Json | null
					name?: string | null
					owner?: string | null
					path_tokens?: string[] | null
					updated_at?: string | null
				}
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			extension: {
				Args: {
					name: string
				}
				Returns: string
			}
			filename: {
				Args: {
					name: string
				}
				Returns: string
			}
			foldername: {
				Args: {
					name: string
				}
				Returns: string[]
			}
			get_size_by_bucket: {
				Args: Record<PropertyKey, never>
				Returns: {
					size: number
					bucket_id: string
				}[]
			}
			search: {
				Args: {
					prefix: string
					bucketname: string
					limits?: number
					levels?: number
					offsets?: number
					search?: string
					sortcolumn?: string
					sortorder?: string
				}
				Returns: {
					name: string
					id: string
					updated_at: string
					created_at: string
					last_accessed_at: string
					metadata: Json
				}[]
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
