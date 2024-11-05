import { NextApiRequest, NextApiResponse } from 'next';
import { isLatexError } from '../utils/errors';

export function errorHandler(
  error: unknown,
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.error('Error:', error);

  if (isLatexError(error)) {
    return res.status(400).json({
      error: {
        message: error.message,
        name: error.name,
        details: error.details,
      },
    });
  }

  if (error instanceof Error) {
    return res.status(500).json({
      error: {
        message: error.message,
        name: error.name,
      },
    });
  }

  return res.status(500).json({
    error: {
      message: 'An unexpected error occurred',
      name: 'UnknownError',
    },
  });
} 