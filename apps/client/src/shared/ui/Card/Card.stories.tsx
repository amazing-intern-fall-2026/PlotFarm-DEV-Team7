import type { Meta, StoryObj } from "@storybook/react";
import { Sprout, MapPin, Calendar, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "./Card";
import { Button } from "../Button";
import { Badge } from "../Badge";

const meta: Meta<typeof Card> = {
  title: "Shared/UI/Card",
  component: Card,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Card>;

export const PlotFarmCard: Story = {
  render: () => (
    <Card className="max-w-sm overflow-hidden">
      <div className="h-40 bg-gradient-to-br from-emerald-600 to-green-800 p-4 flex flex-col justify-between text-white">
        <div className="flex justify-between items-center">
          <Badge variant="secondary">Sắp Thu Hoạch</Badge>
          <span className="text-xs bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
            Lô A-12
          </span>
        </div>
        <div>
          <div className="text-xs text-emerald-100 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> Nông trại Cầu Đất, Đà Lạt
          </div>
          <h4 className="text-lg font-bold">Vườn Rau Thủy Canh</h4>
        </div>
      </div>
      <CardHeader>
        <CardTitle>Mảnh Đất Canh Tác 250m²</CardTitle>
        <CardDescription>
          Đang trồng xà lách Romaine và cà chua bi hữu cơ theo quy trình chuẩn VietGAP.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> Thời hạn thuê
            </span>
            <span className="font-medium text-foreground">Còn 45 ngày</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Sprout className="h-4 w-4" /> Tiến độ sinh trưởng
            </span>
            <span className="font-medium text-emerald-600">75% (Tuần 6)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div>
          <span className="text-xs text-muted-foreground">Giá thuê</span>
          <p className="font-bold text-primary">1.200.000 đ/tháng</p>
        </div>
        <Button size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
          Chi Tiết
        </Button>
      </CardFooter>
    </Card>
  )
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Thông tin nông dân</CardTitle>
        <CardDescription>Chi tiết tài khoản và lịch sử cho thuê</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Nguyễn Văn An — 10 năm kinh nghiệm canh tác hữu cơ tại Lâm Đồng.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" size="sm">
          Hủy
        </Button>
        <Button size="sm">Lưu thay đổi</Button>
      </CardFooter>
    </Card>
  )
};
