// useLogin.ts

'use client';

import { useRouter } from 'next/navigation'; // Corrected import from 'next/navigation' to 'next/router'
import { useState } from 'react';
import { toast } from 'react-toastify';

import service from '@/utils/service/service';
import { setCookie } from '@/utils/functions/commonFunction';

interface LoginData {
  username: string;
  password: string;
}
interface UseLoginReturn {
  handleLogin: (data: LoginData) => Promise<void>;
  loading: boolean;
}
const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    try {
      const loginRes: any = await service.makeAPICall({
        methodName: service.Methods.POST,
        apiUrl: service.API_URL.auth.login,
        body: data,
      });

      if (loginRes?.success) {
        setCookie('token', loginRes.data.token, 7);
        toast.success(loginRes.message);
        router.push('/');
      } else {
        toast.error(loginRes.data.message);
      }
    } catch (error) {
      toast.error('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    loading,
  };
};

export default useLogin;
