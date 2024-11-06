export const escapeLatex = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/[&%$#_{}~^]/g, '\\$&')
    .replace(/</g, '\\textless{}')
    .replace(/>/g, '\\textgreater{}');
}; 