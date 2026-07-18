import { useState, useEffect, useCallback } from 'react';

// تفعيل الواجهة لتقبل النجاح والفشل كـ boolean عامة تنهي تعارض دوال الموك
export interface ApiGenericResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  courses?: T extends { courses: infer C } ? C : any; // حماية لملف الموك الحالي
  reviews?: T extends { reviews: infer R } ? R : any;
}

export function useApi<T>(apiFunc: (...args: any[]) => Promise<ApiGenericResult<T>>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc();
      if (result && result.success) {
        // نمرر النتيجة بالكامل لتستفيد منها الصفحات سواء كانت data أو حقول مباشرة
        setData(result as unknown as T);
      } else {
        setError(result && 'error' in result ? String(result.error) : 'API Operational Failure');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData, setData };
}