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
        plots: "Gói thuê đất",
        crops: "Cây trồng",
        farms: "Nông trại mẫu",
        about: "Về PlotFarm",
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
        manageCrops: "Quản lý Cây trồng",
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
      },
      footer: {
        description: "Nền tảng nông nghiệp thông minh giúp gia đình bạn sở hữu lô đất canh tác nông sản hữu cơ chuẩn VietGAP tại Đà Lạt từ xa qua camera IoT.",
        badges: ["VietGAP Certified", "GlobalG.A.P Farm", "Organic Bio"],
        processTitle: "Quy Trình & Canh Tác",
        processLinks: [
          "Chọn lô đất canh tác",
          "Lập kế hoạch trồng & chọn rau",
          "Giám sát qua camera IoT 24/7",
          "Thu hoạch & Giao hàng tận nhà"
        ],
        supportTitle: "Hỗ Trợ & Chính Sách",
        supportLinks: [
          "Chính sách bảo hiểm mùa vụ",
          "Tiêu chuẩn kiểm nghiệm đất & nước",
          "Trải nghiệm tham quan nông trại",
          "Điều khoản thuê đất canh tác"
        ],
        contactTitle: "Trang Trại Đà Lạt",
        address: "Địa chỉ: Thôn Lạc Dương, Huyện Lạc Dương, TP. Đà Lạt, Lâm Đồng",
        hotline: "Hotline hỗ trợ: 1900 6868",
        email: "Email: hotro@plotfarm.vn",
        copyright: "© 2026 PlotFarm Da Lat. Đơn vị tiên phong Farm-to-Home Nông nghiệp Công nghệ cao Đà Lạt.",
        privacyPolicy: "Bảo mật thông tin",
        termsOfService: "Cam kết dịch vụ",
        iotRegulations: "Quy định IoT"
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
        plots: "Plot Packages",
        crops: "Crops",
        farms: "Model Farms",
        about: "About PlotFarm",
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
      },
      footer: {
        description: "Smart agriculture platform helping families own and cultivate organic VietGAP farmland in Da Lat remotely via IoT cameras.",
        badges: ["VietGAP Certified", "GlobalG.A.P Farm", "Organic Bio"],
        processTitle: "Process & Cultivation",
        processLinks: [
          "Select farming plot",
          "Crop planning & seed selection",
          "24/7 IoT Camera monitoring",
          "Harvest & Home delivery"
        ],
        supportTitle: "Support & Policies",
        supportLinks: [
          "Harvest guarantee insurance",
          "Soil & Water testing standards",
          "Farm visit experience",
          "Farmland leasing terms"
        ],
        contactTitle: "Da Lat Farm",
        address: "Address: Lac Duong Commune, Da Lat, Lam Dong",
        hotline: "Support Hotline: 1900 6868",
        email: "Email: support@plotfarm.vn",
        copyright: "© 2026 PlotFarm Da Lat. Pioneer in High-Tech Farm-to-Home Agriculture in Da Lat.",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Service Commitment",
        iotRegulations: "IoT Regulations"
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
