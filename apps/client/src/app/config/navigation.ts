import type { UserRole } from '../../shared/types/auth';
import { PATHS } from '../routes/paths';

export interface NavItemConfig {
  key: string;
  labelKey: string;
  path: string;
  icon: string;
}

export interface PortalConfig {
  titleKey: string;
  badgeClass: string;
  items: NavItemConfig[];
}

export const PORTAL_NAVIGATION: Record<UserRole, PortalConfig> = {
  CUSTOMER: {
    titleKey: 'portals.customer',
    badgeClass: 'text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/50',
    items: [
      { key: 'dashboard', labelKey: 'nav.dashboard', path: PATHS.CUSTOMER.DASHBOARD, icon: '📊' },
      { key: 'myPlots', labelKey: 'nav.myPlots', path: PATHS.CUSTOMER.MY_PLOTS, icon: '🌱' },
      { key: 'contracts', labelKey: 'nav.contracts', path: PATHS.CUSTOMER.CONTRACTS, icon: '📜' },
      { key: 'careRequests', labelKey: 'nav.careRequests', path: PATHS.CUSTOMER.CARE_REQUESTS, icon: '💧' },
      { key: 'compensations', labelKey: 'nav.compensations', path: PATHS.CUSTOMER.COMPENSATIONS, icon: '🛡️' },
      { key: 'bankAccounts', labelKey: 'nav.bankAccounts', path: PATHS.CUSTOMER.BANK_ACCOUNTS, icon: '💳' },
    ],
  },
  STAFF: {
    titleKey: 'portals.staff',
    badgeClass: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/50',
    items: [
      { key: 'dashboard', labelKey: 'nav.dashboard', path: PATHS.STAFF.DASHBOARD, icon: '📋' },
      { key: 'assignedPlots', labelKey: 'nav.assignedPlots', path: PATHS.STAFF.ASSIGNED_PLOTS, icon: '🚜' },
      { key: 'careTasks', labelKey: 'nav.careTasks', path: PATHS.STAFF.CARE_TASKS, icon: '🌿' },
      { key: 'harvests', labelKey: 'nav.harvests', path: PATHS.STAFF.HARVESTS, icon: '🧺' },
      { key: 'shipments', labelKey: 'nav.shipments', path: PATHS.STAFF.SHIPMENTS, icon: '🚚' },
    ],
  },
  ADMIN: {
    titleKey: 'portals.admin',
    badgeClass: 'text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/50',
    items: [
      { key: 'dashboard', labelKey: 'nav.dashboard', path: PATHS.ADMIN.DASHBOARD, icon: '📈' },
      { key: 'manageFarms', labelKey: 'nav.manageFarms', path: PATHS.ADMIN.MANAGE_FARMS, icon: '🏡' },
      { key: 'manageCrops', labelKey: 'nav.manageCrops', path: PATHS.ADMIN.MANAGE_CROPS, icon: '🌱' },
      { key: 'managePlots', labelKey: 'nav.managePlots', path: PATHS.ADMIN.MANAGE_PLOTS, icon: '📡' },
      { key: 'compensations', labelKey: 'nav.compensations', path: PATHS.ADMIN.COMPENSATIONS, icon: '⚖️' },
      { key: 'auditLogs', labelKey: 'nav.auditLogs', path: PATHS.ADMIN.AUDIT_LOGS, icon: '🛡️' },
      { key: 'users', labelKey: 'nav.users', path: PATHS.ADMIN.USERS, icon: '👥' },
    ],
  },
};
