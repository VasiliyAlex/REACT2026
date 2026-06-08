export function isValidEmail(
  email: string,
): boolean {
  const parts = email.split('@');

  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domain] = parts;

  if (!localPart.trim()) {
    return false;
  }

  if (!domain.trim()) {
    return false;
  }

  return domain.includes('.');
}