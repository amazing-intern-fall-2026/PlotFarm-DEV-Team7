import * as React from "react";
import { ShieldCheck, Tag } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { formatVND } from "../PriceDisplay";
import { Button } from "../Button";

export interface OrderItemLine {
  label: string;
  amount: number;
  note?: string;
}

export interface OrderSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  plotName: string;
  plotCode: string;
  location: string;
  image: string;
  durationMonths: number;
  items?: OrderItemLine[];
  discountAmount?: number;
  depositPercentage?: number;
  onApplyVoucher?: (code: string) => void;
}

export const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  (
    {
      plotName,
      plotCode,
      location,
      image,
      durationMonths,
      items = [
        { label: "Tiền thuê mảnh đất (3 tháng)", amount: 3600000 },
        { label: "Gói giống rau hữu cơ & vật tư", amount: 450000 },
        { label: "Phí kỹ sư chăm sóc & tưới tự động", amount: 300000 }
      ],
      discountAmount = 250000,
      depositPercentage,
      onApplyVoucher,
      className,
      ...props
    },
    ref
  ) => {
    const [voucherCode, setVoucherCode] = React.useState("");

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const total = Math.max(0, subtotal - (discountAmount || 0));
    const payableAmount = depositPercentage ? (total * depositPercentage) / 100 : total;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4",
          className
        )}
        {...props}
      >
        <h3 className="font-bold text-base text-foreground">Tóm tắt đơn đặt thuê</h3>

        {/* Mini plot preview */}
        <div className="flex items-center gap-3 rounded-xl bg-muted/40 p-2.5 border border-border/60">
          <img
            src={image}
            alt={plotName}
            className="h-16 w-16 shrink-0 rounded-lg object-cover"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-[10px] text-primary font-bold">{plotCode}</span>
            <h4 className="font-bold text-xs text-foreground truncate">{plotName}</h4>
            <span className="text-[11px] text-muted-foreground truncate">{location}</span>
            <span className="text-[11px] font-medium text-emerald-700 mt-0.5">
              Thời hạn thuê: {durationMonths} tháng
            </span>
          </div>
        </div>

        {/* Cost breakdown */}
        <div className="space-y-2 border-t border-border/60 pt-3 text-xs">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-start gap-2">
              <div className="flex flex-col">
                <span className="text-muted-foreground">{item.label}</span>
                {item.note && <span className="text-[10px] text-muted-foreground/75">{item.note}</span>}
              </div>
              <span className="font-semibold text-foreground tabular-nums whitespace-nowrap">
                {formatVND(item.amount)} đ
              </span>
            </div>
          ))}

          {discountAmount > 0 && (
            <div className="flex justify-between items-center text-emerald-600 font-medium pt-1">
              <span className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                Ưu đãi giảm giá
              </span>
              <span className="tabular-nums">- {formatVND(discountAmount)} đ</span>
            </div>
          )}
        </div>

        {/* Voucher input */}
        <div className="flex gap-2 pt-1">
          <input
            type="text"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
            placeholder="Mã ưu đãi (VOUCHER)"
            className="h-8 flex-1 rounded-md border border-input bg-background px-2.5 text-xs text-foreground uppercase placeholder:normal-case focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApplyVoucher?.(voucherCode)}
            disabled={!voucherCode.trim()}
          >
            Áp dụng
          </Button>
        </div>

        {/* Total breakdown */}
        <div className="border-t border-border pt-3 space-y-1">
          <div className="flex justify-between items-baseline">
            <span className="font-bold text-sm text-foreground">Tổng cộng:</span>
            <span className="font-extrabold text-lg text-primary tabular-nums">
              {formatVND(payableAmount)} đ
            </span>
          </div>
          {depositPercentage && (
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>Thanh toán trước đặt cọc ({depositPercentage}%):</span>
              <span className="tabular-nums">{formatVND(payableAmount)} đ</span>
            </div>
          )}
        </div>

        {/* Guarantees */}
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50/70 p-2.5 text-[11px] text-emerald-800">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
          <span>Cam kết 100% hữu cơ & bồi hoàn 100% nếu nông sản không đạt chuẩn.</span>
        </div>
      </div>
    );
  }
);
OrderSummary.displayName = "OrderSummary";
