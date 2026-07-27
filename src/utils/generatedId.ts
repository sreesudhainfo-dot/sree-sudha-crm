export function generateId(prefix: string): string {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();

  return `${prefix}-${random}`;
}