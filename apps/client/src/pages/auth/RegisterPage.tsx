import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/entities/session';
import { PATHS } from '@/shared/config/paths';
import { Logo } from '@/shared/ui';

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    login({
      id: `usr_cust_${Date.now()}`,
      email: formData.email,
      fullName: formData.fullName,
      role: 'CUSTOMER',
    });

    navigate(PATHS.CUSTOMER.DASHBOARD);
  };

  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-8 font-sans">
      <div className="w-full max-w-md space-y-5 rounded-2xl border border-border bg-card p-6 shadow-xs">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Đăng ký tài khoản</h1>
          <p className="text-sm text-muted-foreground">
            Bắt đầu trải nghiệm canh tác nông trại thông minh cùng PlotFarm
          </p>
        </div>

        {error && (
          <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">
              Họ và tên
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Nguyễn Văn A"
              className="block w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="block w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">
              Số điện thoại
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="0912345678"
              className="block w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="block w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
              className="block w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition"
          >
            Đăng ký
          </button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Đã có tài khoản?{' '}
          <Link to={PATHS.AUTH.LOGIN} className="font-semibold text-primary hover:underline">
            {t('common.actions.login')}
          </Link>
        </div>
      </div>
    </div>
  );
};
