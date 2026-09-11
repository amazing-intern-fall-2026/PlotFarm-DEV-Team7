import type { Meta, StoryObj } from "@storybook/react";
import {
  Sprout,
  Layers,
  Palette,
  CheckCircle2,
  PackageCheck,
  Sparkles,
  ShieldCheck,
  Component
} from "lucide-react";
import { Badge } from "@/shared/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/shared/ui/Card";
import { Separator } from "@/shared/ui/Separator";

const meta: Meta = {
  title: "Giới thiệu/Tổng quan hệ thống",
  parameters: {
    docs: {
      description: {
        component: `
# 🌿 PlotFarm Design System & UI Architecture

Chào mừng bạn đến với thư viện thành phần giao diện (UI Component Library) chuẩn hóa của **PlotFarm**.
Tài liệu này cung cấp hướng dẫn toàn diện về kiến trúc FSD (Feature-Sliced Design), hệ thống Design Tokens, quy chuẩn màu sắc, font chữ và các thành phần Atomic Base UI tái sử dụng.
        `
      }
    },
    controls: { hideNoControlsWarning: true }
  }
};

export default meta;

export const TongQuan: StoryObj = {
  render: () => (
    <div className="max-w-5xl mx-auto py-8 px-6 space-y-10 text-foreground font-sans">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-green-900 p-8 text-white shadow-xl">
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-xs font-semibold text-emerald-100 border border-white/20">
            <Sprout className="h-4 w-4" /> PlotFarm Design System v1.0.0
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Chuẩn Hóa Giao Diện & Kiến Trúc UI
          </h1>
          <p className="text-emerald-100 text-base leading-relaxed">
            Hệ thống thiết kế tập trung, tinh giản và đồng bộ dựa trên chuẩn mực Feature-Sliced Design (FSD).
            Mọi thành phần trong <code className="bg-black/20 px-1.5 py-0.5 rounded text-white font-mono text-sm">shared/ui</code> đều là <strong>Atomic Base UI</strong> thuần túy, loại bỏ hoàn toàn mã nguồn thừa và không phụ thuộc domain logic.
          </p>
        </div>
        <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none">
          <Sprout className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight">Quy Chuẩn Cốt Lõi (Core Principles)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                <Sparkles className="h-5 w-5" />
              </div>
              <CardTitle className="text-base font-semibold">1. Đồng Bộ Font & Màu Sắc</CardTitle>
              <CardDescription>
                Sử dụng duy nhất font chữ <strong>Plus Jakarta Sans</strong> trên toàn bộ màn hình. Toàn bộ màu sắc dùng <strong>Semantic CSS Tokens</strong> (<code className="text-xs bg-muted px-1 py-0.5 rounded">bg-primary</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">text-foreground</code>), nghiêm cấm hardcode mã hex tùy tiện.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-2">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <CardTitle className="text-base font-semibold">2. Nguyên Tắc Atomic Base UI</CardTitle>
              <CardDescription>
                Thư mục <code className="text-xs bg-muted px-1 py-0.5 rounded">shared/ui</code> chỉ chứa <strong>Base Components</strong> thuần túy. Toàn bộ UI đặc thù nghiệp vụ (bản đồ thửa đất, thanh toán QR, thẻ cây trồng) đã được tách về đúng tầng <code className="text-xs bg-muted px-1 py-0.5 rounded">features/</code> hoặc <code className="text-xs bg-muted px-1 py-0.5 rounded">widgets/</code>.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center mb-2">
                <PackageCheck className="h-5 w-5" />
              </div>
              <CardTitle className="text-base font-semibold">3. Hợp Nhất StateView</CardTitle>
              <CardDescription>
                Không phân mảnh mã nguồn cho các trạng thái rời rạc. Dùng duy nhất component <strong>StateView</strong> để xử lý trọn vẹn 4 trường hợp: <strong>Loading</strong>, <strong>Fetching</strong>, <strong>Empty</strong> và <strong>Error</strong> cho cả toàn trang lẫn trong từng thẻ card.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Semantic Color Tokens */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight">Hệ Thống Semantic Design Tokens</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Bảng màu thương hiệu xanh lá nông nghiệp kết hợp nền xám nhẹ hiện đại, bảo đảm độ tương phản chuẩn WCAG 2.1 AA:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-2">
            <div className="h-12 w-full rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
              Primary (#2E7D32)
            </div>
            <div className="text-xs">
              <p className="font-semibold text-foreground">bg-primary</p>
              <p className="text-muted-foreground">Màu chủ đạo nông nghiệp</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-2">
            <div className="h-12 w-full rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-xs">
              Secondary (Hổ Phách)
            </div>
            <div className="text-xs">
              <p className="font-semibold text-foreground">bg-secondary</p>
              <p className="text-muted-foreground">Màu điểm nhấn nông sản</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-2">
            <div className="h-12 w-full rounded-lg bg-background border border-border flex items-center justify-center text-foreground font-bold text-xs">
              Background (#F8FAFC)
            </div>
            <div className="text-xs">
              <p className="font-semibold text-foreground">bg-background</p>
              <p className="text-muted-foreground">Nền trang web tổng thể</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-2">
            <div className="h-12 w-full rounded-lg bg-destructive flex items-center justify-center text-destructive-foreground font-bold text-xs">
              Destructive (#DC2626)
            </div>
            <div className="text-xs">
              <p className="font-semibold text-foreground">bg-destructive</p>
              <p className="text-muted-foreground">Cảnh báo sâu bệnh, lỗi</p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Component Inventory Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Component className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight">Danh Mục 9 Base Components Chuẩn Hóa</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Tất cả 9 component dưới đây đều được chuẩn hóa storybook, có đầy đủ header giới thiệu mục đích sử dụng, hướng dẫn truyền props và bảng điều khiển trực quan:
        </p>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-xs font-semibold text-muted-foreground uppercase border-b border-border">
              <tr>
                <th className="py-3 px-4 whitespace-nowrap">Component</th>
                <th className="py-3 px-4">Mục Đích Sử Dụng</th>
                <th className="py-3 px-4">Props Trọng Tâm</th>
                <th className="py-3 px-4 text-center whitespace-nowrap w-28">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3 px-4 font-semibold text-primary whitespace-nowrap">Button</td>
                <td className="py-3 px-4 text-muted-foreground">Kích hoạt hành động, submit form, mở modal</td>
                <td className="py-3 px-4 font-mono text-xs">variant, size, isLoading, leftIcon, rightIcon</td>
                <td className="py-3 px-4 text-center whitespace-nowrap"><Badge variant="success">Chuẩn hóa</Badge></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-primary whitespace-nowrap">Input</td>
                <td className="py-3 px-4 text-muted-foreground">Ô nhập liệu cho mọi form đăng nhập, tìm kiếm, số liệu</td>
                <td className="py-3 px-4 font-mono text-xs">label, hint, error, leftIcon, rightIcon</td>
                <td className="py-3 px-4 text-center whitespace-nowrap"><Badge variant="success">Chuẩn hóa</Badge></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-primary whitespace-nowrap">Card</td>
                <td className="py-3 px-4 text-muted-foreground">Container đóng gói thông tin (Header, Content, Footer)</td>
                <td className="py-3 px-4 font-mono text-xs">CardHeader, CardTitle, CardContent, CardFooter</td>
                <td className="py-3 px-4 text-center whitespace-nowrap"><Badge variant="success">Chuẩn hóa</Badge></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-primary whitespace-nowrap">Badge</td>
                <td className="py-3 px-4 text-muted-foreground">Nhãn trạng thái (Đang canh tác, Sắp thu hoạch, VietGAP)</td>
                <td className="py-3 px-4 font-mono text-xs">variant (default, secondary, success, warning...), icon</td>
                <td className="py-3 px-4 text-center whitespace-nowrap"><Badge variant="success">Chuẩn hóa</Badge></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-primary whitespace-nowrap">Avatar</td>
                <td className="py-3 px-4 text-muted-foreground">Ảnh đại diện người dùng, nông dân với fallback tên viết tắt</td>
                <td className="py-3 px-4 font-mono text-xs">src, name, size, status (online, offline...)</td>
                <td className="py-3 px-4 text-center whitespace-nowrap"><Badge variant="success">Chuẩn hóa</Badge></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-primary whitespace-nowrap">Modal</td>
                <td className="py-3 px-4 text-muted-foreground">Hộp thoại nổi (dialog popup overlay) kèm ESC và backdrop</td>
                <td className="py-3 px-4 font-mono text-xs">isOpen, onClose, title, description, size, footer</td>
                <td className="py-3 px-4 text-center whitespace-nowrap"><Badge variant="success">Chuẩn hóa</Badge></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-primary whitespace-nowrap">StateView</td>
                <td className="py-3 px-4 text-muted-foreground">Hợp nhất 4 trạng thái Loading / Fetching / Empty / Error</td>
                <td className="py-3 px-4 font-mono text-xs">state, variant, emptyPreset, error, onRetry, action</td>
                <td className="py-3 px-4 text-center whitespace-nowrap"><Badge variant="success">Chuẩn hóa</Badge></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-primary whitespace-nowrap">Skeleton</td>
                <td className="py-3 px-4 text-muted-foreground">Khung giả lập nhấp nháy mô phỏng layout đang tải dữ liệu</td>
                <td className="py-3 px-4 font-mono text-xs">className (h-*, w-*, rounded-*)</td>
                <td className="py-3 px-4 text-center whitespace-nowrap"><Badge variant="success">Chuẩn hóa</Badge></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-primary whitespace-nowrap">Separator</td>
                <td className="py-3 px-4 text-muted-foreground">Đường kẻ phân cách nội dung theo chiều ngang hoặc dọc</td>
                <td className="py-3 px-4 font-mono text-xs">orientation (horizontal | vertical)</td>
                <td className="py-3 px-4 text-center whitespace-nowrap"><Badge variant="success">Chuẩn hóa</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-4">
        <h3 className="font-bold text-lg text-primary flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" /> Hướng Dẫn Sử Dụng Nhanh
        </h3>
        <p className="text-sm text-foreground leading-relaxed">
          Để sử dụng bất kỳ component nào trong code dự án, hãy import trực tiếp từ đường dẫn alias <code className="bg-background px-2 py-0.5 rounded border text-xs font-mono font-bold text-primary">@/shared/ui</code>:
        </p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg text-xs font-mono overflow-x-auto">
{`import { Button, Input, Card, Badge, StateView, Modal } from "@/shared/ui";

export function PlotDetailView({ plot, isLoading, isError, onRetry }) {
  return (
    <StateView state={isLoading ? "loading" : isError ? "error" : "idle"} onRetry={onRetry}>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{plot?.title}</CardTitle>
            <Badge variant="success">Đang Canh Tác</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p>Diện tích: {plot?.area} m²</p>
        </CardContent>
      </Card>
    </StateView>
  );
}`}
        </pre>
      </div>
    </div>
  )
};
