import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'student' | 'company' | 'trainer' | 'admin' | null;

interface AuthState {
  isAuthenticated: boolean;
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(null);

  const login = (r: Role) => setRole(r);
  const logout = () => setRole(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!role, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
