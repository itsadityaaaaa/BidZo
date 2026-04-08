// Example API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
  message: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}
