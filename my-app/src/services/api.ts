/// <reference types="vite/client" />
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// تعديل المفتاح إلى 'user_token' ليتوافق مع الـ AuthContext ويجلب التوكن بشكل صحيح
export function getToken(): string | null {
  return localStorage.getItem('user_token');
}

// دالة موحدة للتعامل مع طلبات fetch وإعادة الأخطاء بشكل واضح
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // إذا كانت الاستجابة فارغة (مثل 204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('فشل في قراءة البيانات من السيرفر');
  }

  if (!response.ok) {
    // رمي الخطأ القادم من الباك إند ليتم عرضه في الواجهة
    throw new Error(data.error || data.message || 'حدث خطأ ما في السيرفر');
  }

  return data as T;
}

export async function login(email: string, password: string) {
  return apiFetch<{ token: string; user: any }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function register(userData: any) {
  return apiFetch<any>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function getCurrentUser() {
  return apiFetch<any>('/auth/me', {
    method: 'GET',
  });
}

export async function submitContact(contactData: any) {
  return apiFetch<any>('/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
  });
}