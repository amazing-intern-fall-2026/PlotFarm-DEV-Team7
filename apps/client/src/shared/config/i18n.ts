import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const defaultNS = "translation";
export const resources = {
  vi: {
    translation: {
      common: {
        appName: "PlotFarm",
        actions: {
          save: "Lưu",
          cancel: "Hủy",
          delete: "Xóa",
          edit: "Chỉnh sửa",
          create: "Tạo mới",
          detail: "Chi tiết",
          rent: "Thuê mảnh đất",
          harvest: "Thu hoạch",
          loading: "Đang xử lý...",
          login: "Đăng nhập",
          logout: "Đăng xuất",
          backHome: "Quay về trang chủ"
        },
        status: {
          available: "Còn trống",
          reserved: "Đang giữ chỗ",
          cultivating: "Đang canh tác",
          harvesting: "Sắp thu hoạch",
          completed: "Đã hoàn thành",
          warning: "Cần chú ý",
          alert: "Cảnh báo"
        }
      },
      roles: {
        guest: "Khách vãng lai",
        customer: "Khách hàng",
        staff: "Kỹ thuật viên",
        admin: "Quản trị viên"
      },
      nav: {
        home: "Trang chủ",
        crops: "Cây giống",
        farms: "Trang trại & Lô đất",
        myPlots: "Mảnh đất của tôi",
        contracts: "Hợp đồng",
        careRequests: "Yêu cầu chăm sóc",
        compensations: "Yêu cầu đền bù",
        bankAccounts: "STK hoàn tiền",
        dashboard: "Bàn làm việc",
        assignedPlots: "Lô đất phụ trách",
        careTasks: "Công việc chăm sóc",
        harvests: "Thu hoạch",
        shipments: "Vận chuyển",
        manageFarms: "Quản lý Farm",
        manageCrops: "Quản lý Cây giống",
        managePlots: "Quản lý Lô đất",
        auditLogs: "Kiểm toán hệ thống",
        users: "Người dùng"
      },
      portals: {
        customer: "Không gian Khách hàng",
        staff: "Kỹ sư & Nông dân",
        admin: "Trung tâm Quản trị"
      },
      errors: {
        unauthorizedTitle: "403 - Quyền truy cập bị từ chối",
        unauthorizedDesc: "Bạn không có thẩm quyền truy cập vào đường dẫn này.",
        notFoundTitle: "404 - Không tìm thấy trang",
        notFoundDesc: "Trang bạn yêu cầu không tồn tại hoặc đã bị gỡ bỏ."
      }
    }
  },
  en: {
    translation: {
      common: {
        appName: "PlotFarm",
        actions: {
          save: "Save",
          cancel: "Cancel",
          delete: "Delete",
          edit: "Edit",
          create: "Create",
          detail: "Details",
          rent: "Rent Plot",
          harvest: "Harvest",
          loading: "Processing...",
          login: "Sign In",
          logout: "Sign Out",
          backHome: "Back to Home"
        },
        status: {
          available: "Available",
          reserved: "Reserved",
          cultivating: "Cultivating",
          harvesting: "Ready to Harvest",
          completed: "Completed",
          warning: "Needs Attention",
          alert: "Alert"
        }
      },
      roles: {
        guest: "Guest",
        customer: "Customer",
        staff: "Staff",
        admin: "Admin"
      },
      nav: {
        home: "Home",
        crops: "Crops",
        farms: "Farms & Plots",
        myPlots: "My Plots",
        contracts: "Contracts",
        careRequests: "Care Requests",
        compensations: "Compensations",
        bankAccounts: "Refund Accounts",
        dashboard: "Dashboard",
        assignedPlots: "Assigned Plots",
        careTasks: "Care Tasks",
        harvests: "Harvests",
        shipments: "Shipments",
        manageFarms: "Manage Farms",
        manageCrops: "Manage Crops",
        managePlots: "Manage Plots",
        auditLogs: "Audit Logs",
        users: "Users"
      },
      portals: {
        customer: "Customer Portal",
        staff: "Staff / Farmer Console",
        admin: "Admin Center"
      },
      errors: {
        unauthorizedTitle: "403 - Access Denied",
        unauthorizedDesc: "You do not have permission to access this resource.",
        notFoundTitle: "404 - Page Not Found",
        notFoundDesc: "The requested page does not exist or has been removed."
      }
    }
  }
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
