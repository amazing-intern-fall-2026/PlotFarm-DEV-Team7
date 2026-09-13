import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { UserRole } from "@repo/shared";
import { AppError } from "@/shared/lib/errors/AppError";
import { useDebouncedCallback } from "@/shared/lib/hooks/useDebouncedCallback";
import { authApi } from "../api/authApi";
import {
  SESSION_KEYS,
  ROLE_HOME_ROUTES,
  AUTH_VALIDATION,
  AUTH_VALIDATION_MESSAGES,
  AUTH_DEBOUNCE_MS,
  getAuthErrorMessage,
} from "../constants";

export interface RegisterFormValues {
  fullName: string;
  email: string;
  phone: string;
  role: "CUSTOMER" | "STAFF";
  password: string;
  confirmPassword: string;
}

export interface RegisterFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export function useRegisterForm() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    clearErrors,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: "CUSTOMER",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });


  const passwordValue = watch("password");

  const debouncedTrigger = useDebouncedCallback(
    (name: keyof RegisterFormValues) => {
      void trigger(name);
    },
    AUTH_DEBOUNCE_MS
  );

  const registerFullName = register("fullName", {
    validate: {
      notEmpty: (val: string) =>
        (val && val.trim().length > 0) || "Vui lòng nhập họ và tên.",
      minLength: (val: string) =>
        (val && val.trim().length >= 2) || "Họ và tên phải có ít nhất 2 ký tự.",
    },
    onChange: () => {
      clearErrors("root");
      debouncedTrigger("fullName");
    },
  });

  const registerEmail = register("email", {
    validate: {
      notEmpty: (val: string) =>
        (val && val.trim().length > 0) || AUTH_VALIDATION_MESSAGES.EMAIL_REQUIRED,
      validEmail: (val: string) =>
        AUTH_VALIDATION.EMAIL_REGEX.test(val?.trim() || "") ||
        AUTH_VALIDATION_MESSAGES.EMAIL_INVALID,
    },
    onChange: () => {
      clearErrors("root");
      debouncedTrigger("email");
    },
  });

  const registerPhone = register("phone", {
    validate: {
      notEmpty: (val: string) =>
        (val && val.trim().length > 0) || "Vui lòng nhập số điện thoại.",
      validPhone: (val: string) =>
        /^[0-9+ ]{9,15}$/.test(val?.trim() || "") ||
        "Số điện thoại không hợp lệ (từ 9 - 15 chữ số).",
    },
    onChange: () => {
      clearErrors("root");
      debouncedTrigger("phone");
    },
  });

  const registerPassword = register("password", {
    validate: {
      notEmpty: (val: string) =>
        (val && val.length > 0) || AUTH_VALIDATION_MESSAGES.PASSWORD_REQUIRED,
      minLength: (val: string) =>
        (val && val.length >= 6) || "Mật khẩu phải có ít nhất 6 ký tự.",
    },
    onChange: () => {
      clearErrors("root");
      debouncedTrigger("password");
    },
  });

  const registerConfirmPassword = register("confirmPassword", {
    validate: {
      notEmpty: (val: string) =>
        (val && val.length > 0) || "Vui lòng nhập xác nhận mật khẩu.",
      matchPassword: (val: string) =>
        val === passwordValue || "Mật khẩu xác nhận không trùng khớp.",
    },
    onChange: () => {
      clearErrors("root");
      debouncedTrigger("confirmPassword");
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const response = (await authApi.register({
        fullName: values.fullName.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
        password: values.password,
      })) as {
        accessToken?: string;
        refreshToken?: string;
        user?: { role?: string; [key: string]: unknown };
      };

      const { accessToken, refreshToken, user } = response || {};

      if (accessToken) {
        sessionStorage.setItem(SESSION_KEYS.ACCESS_TOKEN, accessToken);
      }
      if (refreshToken) {
        sessionStorage.setItem(SESSION_KEYS.REFRESH_TOKEN, refreshToken);
      }
      if (user) {
        sessionStorage.setItem(SESSION_KEYS.USER, JSON.stringify(user));
      }

      setIsSuccess(true);

      const targetRoute = ROLE_HOME_ROUTES[user?.role as UserRole] || "/";
      setTimeout(() => {
        navigate(targetRoute, { replace: true });
      }, 800);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        if (err.errorCode === "ERR_DUPLICATE" || err.message.includes("sử dụng")) {
          setError("email", {
            type: "server",
            message: "Email này đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác.",
          });
          return;
        }

        setError("root", {
          type: "server",
          message: err.message || getAuthErrorMessage(err.errorCode),
        });
        return;
      }

      const rawMsg = err instanceof Error ? err.message : "";
      setError("root", {
        type: "server",
        message: rawMsg || "Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.",
      });
    }
  };

  const formErrors: RegisterFormErrors = {
    fullName: errors.fullName?.message,
    email: errors.email?.message,
    phone: errors.phone?.message,
    password: errors.password?.message,
    confirmPassword: errors.confirmPassword?.message,
    general: errors.root?.message,
  };

  return {
    registerFullName,
    registerEmail,
    registerPhone,
    registerPassword,
    registerConfirmPassword,
    handleSubmit: handleSubmit(onSubmit),
    errors: formErrors,
    isLoading: isSubmitting,
    isSuccess,
  };
}

