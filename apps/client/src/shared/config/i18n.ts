import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const defaultNS = "translation";
export const resources = {
  vi: {
    translation: {
      common: {
        actions: {
          save: "Lưu",
          cancel: "Hủy",
          delete: "Xóa",
          edit: "Chỉnh sửa",
          create: "Tạo mới",
          detail: "Chi tiết",
          rent: "Thuê mảnh đất",
          harvest: "Thu hoạch",
          loading: "Đang xử lý..."
        },
        status: {
          cultivating: "Đang canh tác",
          harvesting: "Sắp thu hoạch",
          completed: "Đã hoàn thành",
          warning: "Cần chú ý",
          alert: "Cảnh báo"
        }
      }
    }
  },
  en: {
    translation: {
      common: {
        actions: {
          save: "Save",
          cancel: "Cancel",
          delete: "Delete",
          edit: "Edit",
          create: "Create",
          detail: "Details",
          rent: "Rent Plot",
          harvest: "Harvest",
          loading: "Processing..."
        },
        status: {
          cultivating: "Cultivating",
          harvesting: "Ready to Harvest",
          completed: "Completed",
          warning: "Needs Attention",
          alert: "Alert"
        }
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
