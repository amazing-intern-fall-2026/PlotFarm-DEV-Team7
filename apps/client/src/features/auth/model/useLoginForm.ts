import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserRole } from "@repo/shared";
import { AppError } from "@/shared/lib/errors/AppError";
import { authApi } from "../api/authApi";
import {
  SESSION_KEYS,
  ROLE_HOME_ROUTES,
  AUTH_VALIDATION,
  AUTH_ROUTES,
} from "../constants";
import { getAuthErrorMessage } from "../constants";

export interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "Vui lòng nhập email.";
  if (!AUTH_VALIDATION.EMAIL_REGEX.test(email)) return "Email không hợp lệ.";
}

function validatePassword(password: string): string | undefined {
  if (!password) return "Vui lòng nhập mật khẩu.";
  if (password.length < AUTH_VALIDATION.PASSWORD_MIN_LENGTH)
    return `Mật khẩu tối thiểu ${AUTH_VALIDATION.PASSWORD_MIN_LENGTH} ký tự.`;
}

export function useLoginForm() {
  const navigate = useNavigate();

  const [values, setValues] = useState<LoginFormState>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(field: keyof LoginFormState, value: string | boolean) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field !== "rememberMe") {
      setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const emailErr = validateEmail(values.email);
    const passErr = validatePassword(values.password);
    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const { tokens, user } = await authApi.login(
        values.email.trim().toLowerCase(),
        values.password
      );

      sessionStorage.setItem(SESSION_KEYS.ACCESS_TOKEN, tokens.accessToken);
      sessionStorage.setItem(SESSION_KEYS.REFRESH_TOKEN, tokens.refreshToken);
      sessionStorage.setItem(SESSION_KEYS.USER, JSON.stringify(user));

      const dest = ROLE_HOME_ROUTES[user.role as UserRole] ?? AUTH_ROUTES.LOGIN;
      navigate(dest, { replace: true });
    } catch (err) {
      const appErr = AppError.fromUnknown(err);
      setErrors({ general: getAuthErrorMessage(appErr.errorCode) });
    } finally {
      setIsLoading(false);
    }
  }

  return { values, errors, isLoading, handleChange, handleSubmit };
}
