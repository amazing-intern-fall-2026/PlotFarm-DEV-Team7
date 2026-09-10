export const PATHS = {
  // Public Paths
  PUBLIC: {
    HOME: '/',
    CROPS: '/crops',
    CROP_DETAIL: (slug: string) => `/crops/${slug}`,
    FARMS: '/farms',
    FARM_DETAIL: (slug: string) => `/farms/${slug}`,
    PLOTS: '/plots',
    PLOT_DETAIL: (id: string) => `/plots/${id}`,
    ABOUT: '/about',
  },

  // Auth Paths
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },

  // Customer Portal (Role: CUSTOMER)
  CUSTOMER: {
    ROOT: '/customer',
    DASHBOARD: '/customer/dashboard',
    MY_PLOTS: '/customer/my-plots',
    CONTRACTS: '/customer/contracts',
    CONTRACT_DETAIL: (id: string) => `/customer/contracts/${id}`,
    CARE_REQUESTS: '/customer/care-requests',
    COMPENSATIONS: '/customer/compensations',
    BANK_ACCOUNTS: '/customer/bank-accounts',
    CHECKOUT: '/customer/checkout',
  },

  // Staff Portal (Role: STAFF)
  STAFF: {
    ROOT: '/staff',
    DASHBOARD: '/staff/dashboard',
    ASSIGNED_PLOTS: '/staff/assigned-plots',
    LOG_NEW: (contractId: string) => `/staff/contracts/${contractId}/logs/new`,
    CARE_TASKS: '/staff/care-tasks',
    HARVESTS: '/staff/harvests',
    SHIPMENTS: '/staff/shipments',
  },

  // Admin Portal (Role: ADMIN)
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin/dashboard',
    MANAGE_FARMS: '/admin/farms',
    MANAGE_CROPS: '/admin/crops',
    MANAGE_PLOTS: '/admin/plots',
    COMPENSATIONS: '/admin/compensations',
    AUDIT_LOGS: '/admin/audit-logs',
    USERS: '/admin/users',
  },

  // Error Paths
  ERROR: {
    UNAUTHORIZED: '/unauthorized',
    NOT_FOUND: '/404',
  },
} as const;
