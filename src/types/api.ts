
export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
    };
  };
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
  code?: string;
}
