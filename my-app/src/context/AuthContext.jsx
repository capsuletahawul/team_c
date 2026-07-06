import { createContext, useContext, useState } from 'react';
import { AUTH_USERS, STUDENTS, TRAINERS, COMPANIES } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ct-user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [notifications, setNotifications] = useState([
    { id: 'n1', message: { ar: 'مرحباً بك في كبسولة تحول', en: 'Welcome to Capsule Tahawul' }, read: false, date: new Date().toISOString() },
  ]);

  const login = (email, password) => {
    const authUser = AUTH_USERS.find(u => u.email === email && u.password === password);
    if (!authUser) return { success: false, error: { ar: 'بيانات غير صحيحة', en: 'Invalid credentials' } };

    let profile = null;
    if (authUser.role === 'student') profile = STUDENTS.find(s => s.id === authUser.profileId);
    else if (authUser.role === 'trainer') profile = TRAINERS.find(t => t.id === authUser.profileId);
    else if (authUser.role === 'company') profile = COMPANIES.find(c => c.id === authUser.profileId);
    else if (authUser.role === 'admin') profile = { id: 'admin1', name: authUser.name };

    const userData = { ...authUser, profile };
    setUser(userData);
    localStorage.setItem('ct-user', JSON.stringify(userData));

    // Add welcome notification
    addNotification({ ar: `مرحباً ${authUser.name.ar}!`, en: `Welcome back ${authUser.name.en}!` });
    return { success: true, role: authUser.role };
  };

  const register = (formData) => {
    const newUser = {
      email: formData.email,
      password: formData.password,
      role: formData.role || 'student',
      profileId: `new-${Date.now()}`,
      name: { ar: formData.name, en: formData.name },
      profile: {
        id: `new-${Date.now()}`,
        name: { ar: formData.name, en: formData.name },
        email: formData.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
        enrolledCourses: [],
        certificates: [],
        joinedDate: new Date().toISOString(),
        bio: { ar: '', en: '' },
        status: formData.role === 'trainer' ? 'pending' : 'approved',
      },
    };
    setUser(newUser);
    localStorage.setItem('ct-user', JSON.stringify(newUser));
    return { success: true, role: newUser.role };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ct-user');
  };

  const addNotification = (message) => {
    setNotifications(prev => [
      { id: Date.now().toString(), message, read: false, date: new Date().toISOString() },
      ...prev,
    ]);
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, notifications, addNotification, markNotificationsRead, unreadCount }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
