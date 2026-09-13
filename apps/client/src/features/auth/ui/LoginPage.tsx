import * as React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Radio,
  ShieldCheck,
  Monitor,
  Truck,
  CheckCircle2,
  User,
  Phone,
  ArrowLeft,
  X,
} from "lucide-react";

import {
  Box,
  Typography,
  Heading,
  Text,
  Badge,
  Button,
  Input,
  Separator,
  Logo,
  Avatar,
  Footer,
} from "@/shared/ui";
import { AUTH_ROUTES, AUTH_UI_TEXT, ROLE_HOME_ROUTES } from "../constants";

import { getStoredUser, isAuthenticated } from "../model/authSession";
import { useLoginForm } from "../model/useLoginForm";
import { useRegisterForm } from "../model/useRegisterForm";


function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.29.07 2.18.74 2.93.77.95-.19 1.86-.88 3.12-.94 1.54-.08 2.77.58 3.58 1.6-3.41 2.06-2.64 6.49.75 7.69-.49 1.26-1.05 2.5-2.38 3.76zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function HeroPanel() {
  return (
    <Box className="relative flex flex-col justify-between h-full overflow-hidden bg-[hsl(135,45%,16%)]">
      <Box className="absolute inset-0 bg-gradient-to-b from-[hsl(135,50%,8%)/60%] via-transparent to-[hsl(135,50%,8%)/80%]" />
      <Box className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[hsl(135,60%,25%)/30%] blur-3xl" />
      <Box className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[hsl(155,50%,20%)/20%] blur-3xl" />

      <Box
        className="absolute inset-0 opacity-30 bg-cover bg-center mix-blend-luminosity"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=900&q=80')",
        }}
      />

      <Box className="relative z-10 flex flex-col justify-between h-full p-5 lg:p-6 gap-4">
        <Box className="flex items-center justify-between">
          <Box className="flex items-center gap-2">
            <Logo size="sm" />
            <Box>
              <Text className="text-sm font-semibold text-white leading-none">
                CloudFarm
              </Text>
              <Text
                variant="muted"
                className="text-[9px] text-[hsl(135,30%,65%)] uppercase tracking-wider"
              >
                {AUTH_UI_TEXT.HERO_BRAND_SUB}
              </Text>
            </Box>
          </Box>
          <Badge
            variant="outline"
            icon={
              <Radio className="h-2.5 w-2.5 text-[hsl(135,70%,50%)] animate-pulse" />
            }
            className="rounded-full bg-[hsl(135,40%,12%)/70%] border-[hsl(135,30%,25%)] text-[10px] text-[hsl(135,30%,70%)] px-2 py-1 backdrop-blur-sm"
          >
            {AUTH_UI_TEXT.HERO_LIVE_BADGE}
          </Badge>
        </Box>

        <Box className="flex-1 flex items-center py-2">
          <Box className="space-y-3.5">
            <Badge
              variant="outline"
              icon={
                <ShieldCheck className="h-3 w-3 text-[hsl(135,55%,45%)]" />
              }
              className="rounded-full bg-[hsl(135,40%,12%)/60%] border-[hsl(135,30%,25%)] text-[10px] text-[hsl(135,30%,70%)] px-2 py-0.5 backdrop-blur-sm"
            >
              {AUTH_UI_TEXT.HERO_MODEL_BADGE}
            </Badge>

            <Typography
              as="blockquote"
              className="text-base lg:text-lg font-semibold leading-snug text-white"
            >
              {AUTH_UI_TEXT.HERO_QUOTE}
            </Typography>

            <Box className="flex items-center gap-2.5">
              <Box className="flex -space-x-1.5">
                {["NL", "MA", "TK"].map((initials) => (
                  <Avatar
                    key={initials}
                    name={initials}
                    size="sm"
                    className="border-2 border-[hsl(135,45%,16%)] bg-[hsl(135,40%,28%)] text-white text-[9px] h-6 w-6"
                  />
                ))}
              </Box>
              <Text className="text-xs text-[hsl(135,20%,65%)]">
                {AUTH_UI_TEXT.HERO_PROOF_PREFIX}{" "}
                <strong className="text-white">
                  {AUTH_UI_TEXT.HERO_PROOF_COUNT}
                </strong>{" "}
                {AUTH_UI_TEXT.HERO_PROOF_SUFFIX}
              </Text>
            </Box>
          </Box>
        </Box>

        <Box className="flex flex-wrap gap-1.5">
          {[
            { icon: CheckCircle2, label: AUTH_UI_TEXT.HERO_PILL_SOIL },
            { icon: Monitor, label: AUTH_UI_TEXT.HERO_PILL_CAMERA },
            { icon: Truck, label: AUTH_UI_TEXT.HERO_PILL_DELIVERY },
          ].map(({ icon: Icon, label }) => (
            <Badge
              key={label}
              variant="outline"
              icon={<Icon className="h-3 w-3 text-[hsl(135,55%,45%)]" />}
              className="rounded-full bg-[hsl(135,40%,12%)/60%] border-[hsl(135,30%,25%)] text-[10px] text-[hsl(135,20%,70%)] px-2 py-0.5 backdrop-blur-sm"
            >
              {label}
            </Badge>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

type AuthTab = "login" | "register";

function LoginFormPanel({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const {
    registerEmail,
    registerPassword,
    registerRememberMe,
    handleSubmit,
    errors,
    isLoading,
    setValue,
    loginWithGoogle,
    isGoogleLoading,
  } = useLoginForm();


  const fillAccount = (email: string) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", "12345678", { shouldValidate: true });
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-3.5 sm:space-y-4"
    >
      <Box className="space-y-1">
        <Heading
          level={1}
          className="text-lg sm:text-xl font-bold text-foreground tracking-tight"
        >
          {AUTH_UI_TEXT.LOGIN_TITLE}
        </Heading>
        <Text
          variant="muted"
          className="text-xs text-muted-foreground leading-relaxed"
        >
          {AUTH_UI_TEXT.LOGIN_SUBTITLE}
        </Text>
      </Box>

      <Box className="rounded-lg border border-primary/20 bg-primary/5 p-2.5">
        <Text variant="small" className="text-xs font-semibold text-primary block mb-1.5">
          Tài khoản mẫu thử nghiệm:
        </Text>
        <Box className="flex flex-wrap gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 text-xs bg-white dark:bg-slate-800"
            onClick={() => fillAccount("customer@plotfarm.vn")}
          >
            Khách hàng
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 text-xs bg-white dark:bg-slate-800"
            onClick={() => fillAccount("staff@plotfarm.vn")}
          >
            Kỹ thuật viên
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 text-xs bg-white dark:bg-slate-800"
            onClick={() => fillAccount("admin@plotfarm.vn")}
          >
            Quản trị viên
          </Button>
        </Box>
      </Box>

      {errors.general && (
        <Box className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errors.general}
        </Box>
      )}

      <Input
        id="login-email"
        type="email"
        label={AUTH_UI_TEXT.EMAIL_LABEL}
        placeholder={AUTH_UI_TEXT.EMAIL_PLACEHOLDER}
        autoComplete="email"
        error={errors.email}
        leftIcon={<Mail className="h-4 w-4" />}
        disabled={isLoading}
        {...registerEmail}
      />

      <Input
        id="login-password"
        type="password"
        label={AUTH_UI_TEXT.PASSWORD_LABEL}
        placeholder={AUTH_UI_TEXT.PASSWORD_PLACEHOLDER}
        autoComplete="current-password"
        error={errors.password}
        leftIcon={<Lock className="h-4 w-4" />}
        showPasswordToggle
        disabled={isLoading}
        {...registerPassword}
      />

      <Box className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground select-none">
          <input
            id="login-remember"
            type="checkbox"
            className="h-4 w-4 accent-primary rounded"
            disabled={isLoading}
            {...registerRememberMe}
          />
          <Text as="span" className="text-sm select-none">
            {AUTH_UI_TEXT.REMEMBER_ME}
          </Text>
        </label>
        <Link
          to={AUTH_ROUTES.FORGOT_PASSWORD}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {AUTH_UI_TEXT.FORGOT_PASSWORD}
        </Link>
      </Box>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isLoading}
        leftIcon={!isLoading ? <ShieldCheck className="h-4 w-4" /> : undefined}
      >
        {AUTH_UI_TEXT.SUBMIT_BUTTON}
      </Button>

      <Box className="relative flex items-center gap-3">
        <Separator className="flex-1" />
        <Text as="span" variant="muted" className="whitespace-nowrap">
          {AUTH_UI_TEXT.DIVIDER_OR}
        </Text>
        <Separator className="flex-1" />
      </Box>

      <Box className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          size="default"
          leftIcon={<GoogleIcon />}
          className="w-full"
          disabled={isLoading || isGoogleLoading}
          onClick={() => void loginWithGoogle()}
        >
          {AUTH_UI_TEXT.SOCIAL_GOOGLE}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="default"
          leftIcon={<AppleIcon />}
          className="w-full"
          disabled={isLoading}
          onClick={() => alert(AUTH_UI_TEXT.APPLE_SOON)}
        >
          {AUTH_UI_TEXT.SOCIAL_APPLE}
        </Button>
      </Box>

      <Text variant="muted" className="text-center text-xs">
        {AUTH_UI_TEXT.TERMS_PREFIX}{" "}
        <Link
          to="/terms"
          className="underline underline-offset-2 hover:text-foreground transition-colors font-medium"
        >
          {AUTH_UI_TEXT.TERMS_CONTRACT}
        </Link>{" "}
        {AUTH_UI_TEXT.TERMS_AND}{" "}
        <Link
          to="/privacy"
          className="underline underline-offset-2 hover:text-foreground transition-colors font-medium"
        >
          {AUTH_UI_TEXT.TERMS_PRIVACY}
        </Link>{" "}
        {AUTH_UI_TEXT.TERMS_SUFFIX}
      </Text>

      <Box className="text-center text-xs text-muted-foreground pt-1">
        Chưa có tài khoản nông trại?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-semibold text-primary hover:underline transition-colors"
        >
          Đăng ký tài khoản mới
        </button>
      </Box>
    </Box>
  );
}


function RegisterFormPanel({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const {
    registerFullName,
    registerEmail,
    registerPhone,
    registerPassword,
    registerConfirmPassword,
    handleSubmit,
    errors,
    isLoading,
    isSuccess,
  } = useRegisterForm();

  return (
    <Box as="form" onSubmit={handleSubmit} noValidate className="space-y-3.5 sm:space-y-4">
      <Box className="space-y-1">
        <Heading
          level={1}
          className="text-xl sm:text-2xl font-bold text-foreground tracking-tight"
        >
          {AUTH_UI_TEXT.REGISTER_TITLE}
        </Heading>
        <Text
          variant="muted"
          className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
        >
          {AUTH_UI_TEXT.REGISTER_SUBTITLE}
        </Text>
      </Box>

      {errors.general && (
        <Box className="rounded-lg border border-destructive/40 bg-destructive/10 px-3.5 py-2.5 text-xs sm:text-sm text-destructive">
          {errors.general}
        </Box>
      )}

      {isSuccess && (
        <Box className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2.5 text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-medium">
          Đăng ký tài khoản thành công! Đang tự động đăng nhập...
        </Box>
      )}


      <Input
        id="register-fullname"
        type="text"
        label="Họ và tên"
        placeholder="Ví dụ: Nguyễn Văn An"
        autoComplete="name"
        error={errors.fullName}
        leftIcon={<User className="h-4 w-4" />}
        disabled={isLoading || isSuccess}
        {...registerFullName}
      />

      <Input
        id="register-email"
        type="email"
        label="Email"
        placeholder="tenban@gmail.com"
        autoComplete="email"
        error={errors.email}
        leftIcon={<Mail className="h-4 w-4" />}
        disabled={isLoading || isSuccess}
        {...registerEmail}
      />

      <Input
        id="register-phone"
        type="tel"
        label="Số điện thoại"
        placeholder="0912 345 678"
        autoComplete="tel"
        error={errors.phone}
        leftIcon={<Phone className="h-4 w-4" />}
        disabled={isLoading || isSuccess}
        {...registerPhone}
      />

      <Input
        id="register-password"
        type="password"
        label="Mật khẩu"
        placeholder="Tối thiểu 6 ký tự"
        autoComplete="new-password"
        error={errors.password}
        leftIcon={<Lock className="h-4 w-4" />}
        showPasswordToggle
        disabled={isLoading || isSuccess}
        {...registerPassword}
      />

      <Input
        id="register-confirm-password"
        type="password"
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu"
        autoComplete="new-password"
        error={errors.confirmPassword}
        leftIcon={<Lock className="h-4 w-4" />}
        showPasswordToggle
        disabled={isLoading || isSuccess}
        {...registerConfirmPassword}
      />


      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full mt-2"
        isLoading={isLoading}
        disabled={isSuccess}
        leftIcon={!isLoading ? <ShieldCheck className="h-4 w-4" /> : undefined}
      >
        Đăng ký tài khoản ngay
      </Button>

      <Box className="text-center text-xs text-muted-foreground pt-1">
        Đã có tài khoản nông trại?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-semibold text-primary hover:underline transition-colors"
        >
          Đăng nhập ngay
        </button>
      </Box>
    </Box>
  );
}

export interface LoginPageProps {
  initialTab?: AuthTab;
}

export function LoginPage({ initialTab = "login" }: LoginPageProps) {
  const [tab, setTab] = React.useState<AuthTab>(initialTab);

  const user = getStoredUser();
  if (user && isAuthenticated()) {
    const dest = ROLE_HOME_ROUTES[user.role] ?? "/";
    return <Navigate to={dest} replace />;
  }

  return (
    <Box className="min-h-screen bg-muted/20 flex flex-col justify-between">
      {/* Top back navigation bar */}
      <Box className="w-full max-w-[800px] mx-auto px-4 pt-4 sm:pt-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Về trang chủ</span>
        </Link>
      </Box>

      {/* Main card container */}
      <Box className="flex-1 flex items-center justify-center p-3 sm:p-5 py-6 sm:py-8">
        <Box className="relative w-full max-w-sm sm:max-w-md lg:max-w-[780px]">
          {/* Card exit button */}
          <Link
            to="/"
            title="Thoát về trang chủ"
            className="absolute top-3 right-3 z-20 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
          >
            <X className="h-4 w-4" />
          </Link>

          <Box className="grid lg:grid-cols-[1fr_1.15fr] gap-0 rounded-2xl border border-border shadow-xl shadow-black/10 overflow-hidden bg-card">
            <Box className="hidden lg:block lg:h-auto">
              <HeroPanel />
            </Box>

            <Box className="flex flex-col justify-center gap-3.5 sm:gap-4 p-5 sm:p-6 lg:p-7">
              <Box className="flex lg:hidden items-center justify-center gap-2.5 mb-1">
                <Logo size="md" />
                <Box>
                  <Heading
                    level={3}
                    className="text-lg font-bold text-foreground tracking-tight leading-tight"
                  >
                    CloudFarm
                  </Heading>
                  <Text
                    variant="muted"
                    className="text-[10px] font-medium leading-none"
                  >
                    {AUTH_UI_TEXT.HERO_BRAND_SUB}
                  </Text>
                </Box>
              </Box>

              {tab === "login" ? (
                <LoginFormPanel onSwitchToRegister={() => setTab("register")} />
              ) : (
                <RegisterFormPanel onSwitchToLogin={() => setTab("login")} />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Attached Footer */}
      <Footer />
    </Box>
  );
}

