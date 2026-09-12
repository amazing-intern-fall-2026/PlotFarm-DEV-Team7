import * as React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Leaf,
  Radio,
  ShieldCheck,
  Monitor,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { cn } from "@/shared/lib/utils";
import { AUTH_ROUTES, AUTH_UI_TEXT, ROLE_HOME_ROUTES } from "../constants";
import { getStoredUser, isAuthenticated } from "../model/authSession";
import { useLoginForm } from "../model/useLoginForm";

/* ─────────────────────────────────────────────
   Inline SVGs cho Google / Apple
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Hero panel left — stats + badges + quote
───────────────────────────────────────────── */
function HeroPanel() {
  return (
    <div className="relative flex flex-col justify-between h-full overflow-hidden rounded-2xl bg-[hsl(135,45%,16%)]">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(135,50%,8%)/60%] via-transparent to-[hsl(135,50%,8%)/80%]" />

      {/* Decorative blurred circles */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[hsl(135,60%,25%)/30%] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[hsl(155,50%,20%)/20%] blur-3xl" />

      {/* Greenhouse background image via CSS */}
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center mix-blend-luminosity"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=900&q=80')",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-8 gap-6">
        {/* Top: brand + live badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(135,55%,40%)]">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">CloudFarm</p>
              <p className="text-[10px] text-[hsl(135,30%,65%)] uppercase tracking-wider">
                {AUTH_UI_TEXT.HERO_BRAND_SUB}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-[hsl(135,40%,12%)/70%] border border-[hsl(135,30%,25%)] px-3 py-1.5 backdrop-blur-sm">
            <Radio className="h-3 w-3 text-[hsl(135,70%,50%)] animate-pulse" />
            <span className="text-xs text-[hsl(135,30%,70%)]">{AUTH_UI_TEXT.HERO_LIVE_BADGE}</span>
          </div>
        </div>

        {/* Middle: quote */}
        <div className="flex-1 flex items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(135,40%,12%)/60%] border border-[hsl(135,30%,25%)] px-3 py-1.5 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-[hsl(135,55%,45%)]" />
              <span className="text-xs text-[hsl(135,30%,70%)]">{AUTH_UI_TEXT.HERO_MODEL_BADGE}</span>
            </div>

            <blockquote className="text-2xl font-semibold leading-snug text-white max-w-sm">
              {AUTH_UI_TEXT.HERO_QUOTE}
            </blockquote>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["NL", "MA", "TK"].map((initials) => (
                  <div
                    key={initials}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[hsl(135,45%,16%)] bg-[hsl(135,40%,28%)] text-[10px] font-bold text-white"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[hsl(135,20%,65%)]">
                {AUTH_UI_TEXT.HERO_PROOF_PREFIX}{" "}
                <strong className="text-white">{AUTH_UI_TEXT.HERO_PROOF_COUNT}</strong>{" "}
                {AUTH_UI_TEXT.HERO_PROOF_SUFFIX}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: feature pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { icon: CheckCircle2, label: AUTH_UI_TEXT.HERO_PILL_SOIL },
            { icon: Monitor, label: AUTH_UI_TEXT.HERO_PILL_CAMERA },
            { icon: Truck, label: AUTH_UI_TEXT.HERO_PILL_DELIVERY },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 rounded-full bg-[hsl(135,40%,12%)/60%] border border-[hsl(135,30%,25%)] px-3 py-1.5 backdrop-blur-sm"
            >
              <Icon className="h-3.5 w-3.5 text-[hsl(135,55%,45%)]" />
              <span className="text-xs text-[hsl(135,20%,70%)]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Tab toggle: Đăng nhập / Đăng ký
───────────────────────────────────────────── */
type AuthTab = "login" | "register";

function TabSwitch({
  active,
  onChange,
}: {
  active: AuthTab;
  onChange: (t: AuthTab) => void;
}) {
  return (
    <div className="flex gap-4 sm:gap-6 border-b border-border">
      {(["login", "register"] as const).map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={cn(
            "pb-3 text-xs sm:text-sm font-medium transition-colors",
            active === tab
              ? "border-b-2 border-primary text-primary font-semibold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab === "login" ? AUTH_UI_TEXT.TAB_LOGIN : AUTH_UI_TEXT.TAB_REGISTER}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Login Form panel
───────────────────────────────────────────── */
function LoginFormPanel() {
  const { values, errors, isLoading, handleChange, handleSubmit } =
    useLoginForm();

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
      <div className="space-y-1.5">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          {AUTH_UI_TEXT.LOGIN_TITLE}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {AUTH_UI_TEXT.LOGIN_SUBTITLE}
        </p>
      </div>

      {/* General error alert */}
      {errors.general && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {errors.general}
        </div>
      )}

      <Input
        id="login-email"
        type="email"
        label={AUTH_UI_TEXT.EMAIL_LABEL}
        placeholder={AUTH_UI_TEXT.EMAIL_PLACEHOLDER}
        autoComplete="email"
        value={values.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.email}
        leftIcon={<Mail className="h-4 w-4" />}
        disabled={isLoading}
      />

      <Input
        id="login-password"
        type="password"
        label={AUTH_UI_TEXT.PASSWORD_LABEL}
        placeholder={AUTH_UI_TEXT.PASSWORD_PLACEHOLDER}
        autoComplete="current-password"
        value={values.password}
        onChange={(e) => handleChange("password", e.target.value)}
        error={errors.password}
        leftIcon={<Lock className="h-4 w-4" />}
        showPasswordToggle
        disabled={isLoading}
      />

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground select-none">
          <input
            id="login-remember"
            type="checkbox"
            className="h-4 w-4 accent-primary rounded"
            checked={values.rememberMe}
            onChange={(e) => handleChange("rememberMe", e.target.checked)}
            disabled={isLoading}
          />
          {AUTH_UI_TEXT.REMEMBER_ME}
        </label>
        <Link
          to={AUTH_ROUTES.FORGOT_PASSWORD}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {AUTH_UI_TEXT.FORGOT_PASSWORD}
        </Link>
      </div>

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

      {/* Divider */}
      <div className="relative flex items-center gap-3">
        <div className="flex-1 border-t border-border" />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {AUTH_UI_TEXT.DIVIDER_OR}
        </span>
        <div className="flex-1 border-t border-border" />
      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          size="default"
          leftIcon={<GoogleIcon />}
          className="w-full"
          disabled={isLoading}
          onClick={() =>
            alert(AUTH_UI_TEXT.GOOGLE_SOON)
          }
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
          onClick={() =>
            alert(AUTH_UI_TEXT.APPLE_SOON)
          }
        >
          {AUTH_UI_TEXT.SOCIAL_APPLE}
        </Button>
      </div>

      {/* Terms */}
      <p className="text-center text-xs text-muted-foreground">
        {AUTH_UI_TEXT.TERMS_PREFIX}{" "}
        <Link to="/terms" className="underline underline-offset-2 hover:text-foreground transition-colors font-medium">
          {AUTH_UI_TEXT.TERMS_CONTRACT}
        </Link>{" "}
        {AUTH_UI_TEXT.TERMS_AND}{" "}
        <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground transition-colors font-medium">
          {AUTH_UI_TEXT.TERMS_PRIVACY}
        </Link>{" "}
        {AUTH_UI_TEXT.TERMS_SUFFIX}
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────────
   Register placeholder panel
───────────────────────────────────────────── */
function RegisterPlaceholder() {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="space-y-1.5">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          {AUTH_UI_TEXT.REGISTER_TITLE}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {AUTH_UI_TEXT.REGISTER_SUBTITLE}
        </p>
      </div>
      <div className="rounded-lg border border-dashed border-border bg-muted/40 p-6 sm:p-8 text-center text-xs sm:text-sm text-muted-foreground">
        {AUTH_UI_TEXT.REGISTER_WIP_NOTICE}
        <br />
        {AUTH_UI_TEXT.REGISTER_BACK_TO_LOGIN}{" "}
        <strong className="text-foreground">{AUTH_UI_TEXT.TAB_LOGIN}</strong>.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main: LoginPage
───────────────────────────────────────────── */
export function LoginPage() {
  const [tab, setTab] = React.useState<AuthTab>("login");

  // Nếu đã đăng nhập, tự động chuyển về trang chủ theo vai trò
  const user = getStoredUser();
  if (user && isAuthenticated()) {
    const dest = ROLE_HOME_ROUTES[user.role] ?? "/";
    return <Navigate to={dest} replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8">
      <div className="w-full max-w-md lg:max-w-4xl my-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-0 rounded-2xl border border-border shadow-2xl shadow-black/20 overflow-hidden bg-card">
          {/* Left hero (Desktop only) */}
          <div className="hidden lg:block lg:h-auto">
            <HeroPanel />
          </div>

          {/* Right form */}
          <div className="flex flex-col justify-center gap-5 sm:gap-6 p-5 sm:p-8 lg:p-10">
            {/* Mobile brand header (shown only when < lg) */}
            <div className="flex lg:hidden items-center justify-center gap-2.5 mb-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-foreground tracking-tight block leading-tight">
                  CloudFarm
                </span>
                <span className="text-[10px] text-muted-foreground font-medium block">
                  {AUTH_UI_TEXT.HERO_BRAND_SUB}
                </span>
              </div>
            </div>

            <TabSwitch active={tab} onChange={setTab} />

            {tab === "login" ? <LoginFormPanel /> : <RegisterPlaceholder />}
          </div>
        </div>
      </div>
    </div>
  );
}
