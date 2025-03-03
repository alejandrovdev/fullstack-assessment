import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';
import request from '../utils/request';

interface IUseAxiosProps {
  defaultLoading?: boolean;
}

export const useAxios = <T = unknown>(
  { defaultLoading = false }: IUseAxiosProps = { defaultLoading: false },
) => {
  const [loading, setLoading] = useState<boolean>(defaultLoading);
  const [error, setError] = useState<AxiosError | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetch = useCallback(async (config: AxiosRequestConfig): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await request<T>(config);

      setData(response.data);

      return response.data;
    } catch (err) {
      const error = err as AxiosError;

      setError(error);

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetch };
};
