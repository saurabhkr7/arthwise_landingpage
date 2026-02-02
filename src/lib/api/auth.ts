const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    _id: string;
    email: string;
    name: string;
    token: string;
  };
  error?: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  portfolio?: any;
}

export async function signUp(email: string, password: string, name: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        displayname: name,
        username: email.split('@')[0] + Math.floor(Math.random() * 1000)
      }),
    });

    const data = await response.json();
    
    if (response.ok && data.status === 'success') {
      // Store token
      if (typeof window !== 'undefined' && data.accessToken) {
        localStorage.setItem('authToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.data));
      }
      return { success: true, data: data.data };
    }
    
    return {
      success: false,
      error: data.message || 'Signup failed',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (response.ok && data.status === 'success') {
      // Store token
      if (typeof window !== 'undefined' && data.accessToken) {
        localStorage.setItem('authToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.data));
      }
      return { success: true, data: data.data };
    }
    
    return {
      success: false,
      error: data.message || 'Login failed',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}

export async function getCurrentUser(): Promise<User | null> {
  const token = getToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.data || null;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}
