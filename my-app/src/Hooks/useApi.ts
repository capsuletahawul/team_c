import { useState, useEffect, useCallback } from 'react';
import { ApiResult } from '../mocks/types';

export function useApi<T>(apiFunc: () => Promise<ApiResult<T>>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // لتفادي الـ Infinite Loop الناتجة عن رندرة الـ Arrow Functions بالصفحات
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc();
      if (result && result.success) {
        setData(result.data);
      } else {
        setError(result && 'error' in result ? (result.error as string) : 'API Error');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []); // 🌟 مصفوفة فارغة تمنع إعادة إنتاج الدالة عشوائياً

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData, setData };
}