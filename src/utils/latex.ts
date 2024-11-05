export function sanitizeLatex(text: string): string {
  if (!text) return '';
  
  // Replace special LaTeX characters
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([#$%&_{}])/g, '\\$1')
    .replace(/\^/g, '\\textasciicircum{}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/</g, '\\textless{}')
    .replace(/>/g, '\\textgreater{}');
}

export function processTemplate(template: string, data: Record<string, any>): string {
  let content = template;

  // Process simple replacements
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'string') {
      const sanitizedValue = sanitizeLatex(value);
      content = content.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), sanitizedValue);
    }
  });

  // Process conditional blocks
  content = content.replace(
    /\{\{#if\s+([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (_, condition, block) => {
      const value = condition.split('.').reduce((obj: Record<string, any>, key: string) => obj?.[key], data);
      return value ? block : '';
    }
  );

  // Process arrays/loops
  content = content.replace(
    /\{\{#each\s+([^}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g,
    (_, arrayPath, block) => {
      const array = arrayPath.split('.').reduce((obj: Record<string, any>, key: string) => obj?.[key], data);
      if (!Array.isArray(array)) return '';
      return array.map(item => {
        let itemBlock = block;
        Object.entries(item).forEach(([key, value]) => {
          if (typeof value === 'string') {
            const sanitizedValue = sanitizeLatex(value);
            itemBlock = itemBlock.replace(
              new RegExp(`\\{\\{${key}\\}\\}`, 'g'),
              sanitizedValue
            );
          }
        });
        return itemBlock;
      }).join('\n');
    }
  );

  return content;
} 