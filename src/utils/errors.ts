export class LatexError extends Error {
  constructor(message: string, public details?: string) {
    super(message);
    this.name = 'LatexError';
  }
}

export class CompilationError extends LatexError {
  constructor(message: string, public log?: string) {
    super(message);
    this.name = 'CompilationError';
  }
}

export class TemplateError extends LatexError {
  constructor(message: string, public template?: string) {
    super(message);
    this.name = 'TemplateError';
  }
}

export function isLatexError(error: unknown): error is LatexError {
  return error instanceof LatexError;
} 