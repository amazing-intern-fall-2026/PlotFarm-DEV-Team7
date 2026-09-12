import { RouterProvider } from "react-router-dom";
import { I18nProvider } from "@/shared/lib/i18n";
import { router } from "@/app/router";

export function App() {
  return (
    <I18nProvider defaultLocale="vi">
      <RouterProvider router={router} />
    </I18nProvider>
  );
}

export default App;

