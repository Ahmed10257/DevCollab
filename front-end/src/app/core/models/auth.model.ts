export interface AuthUser {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  isLeader: boolean;
  teamId: number | null;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface LoginRequest {
  /** AD SAM account name (e.g. ahmed.mabrouk) or UPN (e.g. you@aast.edu) */
  username: string;
  password: string;
}
