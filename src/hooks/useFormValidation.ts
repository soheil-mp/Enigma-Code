import { useState, useEffect } from 'react';

export function useFormValidation<T>(
  data: T,
  validateFn: (data: T) => { errors: Array<{ field: string; message: string }>; isValid: boolean }
) {
  const [errors, setErrors] = useState<Array<{ field: string; message: string }>>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { errors, isValid } = validateFn(data);
    setErrors(errors);
    setIsValid(isValid);
  }, [data]);

  return { errors, isValid };
} 