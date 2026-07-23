/// <reference types="vite/client" />

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// جلب التوكن من Local Storage
export function getToken(): string | null {
  return localStorage.getItem("user_token");
}

// دالة موحدة لجميع طلبات الـ API
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return {} as T;
  }

  let data: any;

  try {
    data = await response.json();
  } catch {
    throw new Error("فشل في قراءة البيانات من السيرفر");
  }

  if (!response.ok) {
    throw new Error(
      data.error || data.message || "حدث خطأ أثناء الاتصال بالسيرفر"
    );
  }

  return data as T;
}

// =======================
// Authentication
// =======================

export async function login(email: string, password: string) {
  return apiFetch<{
    token: string;
    user: any;
  }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function register(userData: any) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function getCurrentUser() {
  return apiFetch("/auth/me", {
    method: "GET",
  });
}

// =======================
// Contact
// =======================

export async function submitContact(contactData: any) {
  return apiFetch("/contact", {
    method: "POST",
    body: JSON.stringify(contactData),
  });
}