
import { useState } from 'react';
import { useAuth } from './use-auth';
import { apiRequest } from '@/lib/queryClient';

export function useFormSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const submitForm = async (endpoint: string, data: any) => {
    if (!user) throw new Error('Not authenticated');
    
    setIsSubmitting(true);
    try {
      const response = await apiRequest('POST', endpoint, data);
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting };
}
