export interface PasswordStrength {
  hasNumber: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSpecial: boolean;
}

export function getPasswordStrength(
  password: string,
): PasswordStrength {
  return {
    hasNumber: /\d/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasSpecial:
      /[!@#$%^&*(),.?":{}|<>]/.test(
        password,
      ),
  };
}