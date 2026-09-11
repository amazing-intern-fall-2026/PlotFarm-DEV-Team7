import type { UserRole } from '../../shared/types/auth';
import { PATHS } from '../routes/paths';

export interface NavItemConfig {
  key: string;
  labelKey: string;
  path: string;
  icon?: string;
}

export interface PortalConfig {
  titleKey: string;
  badgeClass: string;
  items: NavItemConfig[];
}

export const PORTAL_NAVIGATION: Record<UserRole, PortalConfig> = {
  CUSTOMER: {
    titleKey: 'portals.customer',
    badgeClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    items: [
      { key: 'dashboard', labelKey: 'nav.dashboard', path: PATHS.CUSTOMER.DASHBOARD },
      { key: 'myPlots', labelKey: 'nav.myPlots', path: PATHS.CUSTOMER.MY_PLOTS },
      { key: 'contracts', labelKey: 'nav.contracts', path: PATHS.CUSTOMER.CONTRACTS },
      { key: 'careRequests', labelKey: 'nav.careRequests', path: PATHS.CUSTOMER.CARE_REQUESTS },
      { key: 'compensations', labelKey: 'nav.compensations', path: PATHS.CUSTOMER.COMPENSATIONS },
      { key: 'bankAccounts', labelKey: 'nav.bankAccounts', path: PATHS.CUSTOMER.BANK_ACCOUNTS },
    ],
  },
  STAFF: {
    titleKey: 'portals.staff',
    badgeClass: 'text-emerald-800 bg-emerald-50 border-emerald-200',
    items: [
      { key: 'dashboard', labelKey: 'nav.dashboard', path: PATHS.STAFF.DASHBOARD },
      { key: 'assignedPlots', labelKey: 'nav.assignedPlots', path: PATHS.STAFF.ASSIGNED_PLOTS },
      { key: 'careTasks', labelKey: 'nav.careTasks', path: PATHS.STAFF.CARE_TASKS },
      { key: 'harvests', labelKey: 'nav.harvests', path: PATHS.STAFF.HARVESTS },
      { key: 'shipments', labelKey: 'nav.shipments', path: PATHS.STAFF.SHIPMENTS },
    ],
  },
  ADMIN: {
    titleKey: 'portals.admin',
    badgeClass: 'text-amber-800 bg-amber-50 border-amber-200',
    items: [
      { key: 'dashboard', labelKey: 'nav.dashboard', path: PATHS.ADMIN.DASHBOARD },
      { key: 'manageFarms', labelKey: 'nav.manageFarms', path: PATHS.ADMIN.MANAGE_FARMS },
      { key: 'manageCrops', labelKey: 'nav.manageCrops', path: PATHS.ADMIN.MANAGE_CROPS },
      { key: 'managePlots', labelKey: 'nav.managePlots', path: PATHS.ADMIN.MANAGE_PLOTS },
      { key: 'compensations', labelKey: 'nav.compensations', path: PATHS.ADMIN.COMPENSATIONS },
      { key: 'auditLogs', labelKey: 'nav.auditLogs', path: PATHS.ADMIN.AUDIT_LOGS },
      { key: 'users', labelKey: 'nav.users', path: PATHS.ADMIN.USERS },
    ],
  },
};
