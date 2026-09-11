import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';

/**
 * Root Application Component
 * Hướng dẫn: Khởi tạo RouterProvider, AuthProvider và các Global Providers tại đây.
 */
export function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-sans p-6">
      <Card className="max-w-md w-full border border-border shadow-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-xl font-bold text-foreground">
            PlotFarm Architecture Ready
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Mã nguồn đã được reset về cấu trúc chuẩn FSD. Toàn bộ thư viện shared/ui đã sẵn sàng.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2 flex justify-center">
          <Button variant="default" size="default">
            Bắt đầu phát triển
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
