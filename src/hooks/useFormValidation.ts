import { useState, useEffect } from 'react';

type ValidationResult = {
  errors: Array<{ field: string; message: string }>;
  isValid: boolean;
};

export function useFormValidation<T>(
  data: T,
  validateFn: (data: T) => ValidationResult
) {
  const [errors, setErrors] = useState<Array<{ field: string; message: string }>>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const result = validateFn(data);
    setErrors(result.errors);
    setIsValid(result.isValid);
  }, [data]);

  return { errors, isValid };
} 