export type Role = "USER" | "ADMIN";

export interface User {
  id: number;
  MCName: string;
  DCName: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}