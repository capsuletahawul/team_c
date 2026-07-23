import { useState, useEffect, useCallback, useRef } from 'react';

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

  // نحتفظ بآخر نسخة من الدالة عبر ref بدل الاعتماد عليها مباشرة —
  // apiFunc يتجدد بكل رسم (لأن الصفحات تمرره كدالة inline)، ولو حطيناه
  // باعتماديات useCallback بيصير لوب لانهائي: جلب -> إعادة رسم -> جلب...
  const apiFuncRef = useRef(apiFunc);
  apiFuncRef.current = apiFunc;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFuncRef.current();
      if (result && result.success) {
        // نفك التغليف ونخزن data فقط — الصفحات تتوقع البيانات مباشرة بدون غلاف {success, data}
        setData(result.data as unknown as T);
      } else {
        setError(result && 'error' in result ? String(result.error) : 'API Operational Failure');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData, setData };
}