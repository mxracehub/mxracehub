
import { useEffect, useState } from 'react';
import { useAuth } from './use-auth';
import { apiRequest } from '@/lib/queryClient';

export function useFormAutosave<T>(path: string, initialData?: T) {
  const [formData, setFormData] = useState<T | undefined>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    const saveData = async () => {
      if (!formData) return;
      setIsSaving(true);
      try {
        await apiRequest('POST', path, formData);
      } catch (error) {
        console.error('Error saving form:', error);
      }
      setIsSaving(false);
    };

    const debounceTimer = setTimeout(saveData, 1000);
    return () => clearTimeout(debounceTimer);
  }, [formData, path, user]);

  return { formData, setFormData, isSaving };
}
