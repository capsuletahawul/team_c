import React, { createContext, useContext, useState, ReactNode } from 'react';

// تعريف الأدوار المتاحة للمستخدمين في النظام
export type Role = 'student' | 'company' | 'trainer' | 'admin' | null;

interface AuthState {
  isAuthenticated: boolean;
  role: Role;
  token: string | null; // إضافة التوكن هنا لإدارة الجلسة بالكامل
  login: (role: Role, token?: string) => void; // جعل التوكن اختيارياً مؤقتاً لتجنب كسر الصفحات الأخرى
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // استعادة دور المستخدم من localStorage عند تحميل التطبيق لمنع تسجيل الخروج عند الـ Refresh
  const [role, setRole] = useState<Role>(() => {
    const savedRole = localStorage.getItem('user_role');
    return (savedRole as Role) || null;
  });

  // استعادة التوكن من الـ localStorage عند تحميل التطبيق[cite: 8]
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('user_token');
  });

  const login = (r: Role, t?: string) => {
    if (r) {
      localStorage.setItem('user_role', r);
    } else {
      localStorage.removeItem('user_role');
    }

    if (t) {
      localStorage.setItem('user_token', t);
      setToken(t);
    }

    setRole(r);
  };

  const logout = () => {
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_token'); // مسح التوكن عند تسجيل الخروج[cite: 8]
    setRole(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!role, role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};