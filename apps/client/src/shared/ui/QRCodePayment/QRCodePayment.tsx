import * as React from "react";
import { Copy, Check, Clock, QrCode, ArrowLeft, CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { formatVND } from "../PriceDisplay";
import { Button } from "../Button";

export interface QRCodePaymentProps extends React.HTMLAttributes<HTMLDivElement> {
  qrImageUrl?: string;
  bankName?: string;
  accountNumber: string;
  accountHolder: string;
  amount: number;
  orderCode: string;
  expiresInSeconds?: number;
  onConfirmTransfer?: () => void;
  onCancel?: () => void;
}

export const QRCodePayment = React.forwardRef<HTMLDivElement, QRCodePaymentProps>(
  (
    {
      qrImageUrl = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020101021238540010A00000072701240006970422011009876543210208QRIBFTTA5303704540718500005802VN62180814PF-984216304",
      bankName = "MB Bank (Ngân hàng Quân Đội)",
      accountNumber,
      accountHolder,
      amount,
      orderCode,
      expiresInSeconds = 900,
      onConfirmTransfer,
      onCancel,
      className,
      ...props
    },
    ref
  ) => {
    const [copiedField, setCopiedField] = React.useState<string | null>(null);
    const [timeLeft, setTimeLeft] = React.useState(expiresInSeconds);

    React.useEffect(() => {
      if (timeLeft <= 0) return;
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (secs: number) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const copyToClipboard = (text: string, fieldName: string) => {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center rounded-2xl border border-border bg-card p-6 shadow-sm max-w-md w-full mx-auto space-y-5",
          className
        )}
        {...props}
      >
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-emerald-50 px-3 py-1 rounded-full mb-1">
            <QrCode className="h-3.5 w-3.5" />
            <span>Quét mã VietQR chuyển khoản 24/7</span>
          </div>
          <h3 className="text-lg font-bold text-foreground">Thanh toán giữ chỗ mảnh đất</h3>
          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-600 font-medium">
            <Clock className="h-3.5 w-3.5" />
            <span>Mã QR hết hạn trong: <strong className="font-mono tabular-nums">{formatTime(timeLeft)}</strong></span>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="relative flex flex-col items-center justify-center rounded-xl border border-border bg-white p-4 shadow-xs">
          <img
            src={qrImageUrl}
            alt="VietQR Payment"
            className="h-52 w-52 object-contain"
          />
          <span className="text-[11px] text-muted-foreground mt-2">
            Mở app ngân hàng bất kỳ để quét mã
          </span>
        </div>

        {/* Transfer Details with quick-copy */}
        <div className="w-full rounded-xl bg-muted/40 p-3.5 border border-border/60 space-y-2.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Ngân hàng:</span>
            <span className="font-semibold text-foreground">{bankName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Chủ tài khoản:</span>
            <span className="font-semibold text-foreground uppercase">{accountHolder}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Số tài khoản:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-foreground">{accountNumber}</span>
              <button
                type="button"
                onClick={() => copyToClipboard(accountNumber, "acc")}
                className="text-primary hover:opacity-80 p-0.5 cursor-pointer"
                title="Sao chép STK"
              >
                {copiedField === "acc" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Số tiền:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-primary text-sm tabular-nums">
                {formatVND(amount)} đ
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(amount.toString(), "amount")}
                className="text-primary hover:opacity-80 p-0.5 cursor-pointer"
                title="Sao chép số tiền"
              >
                {copiedField === "amount" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Nội dung chuyển khoản:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-secondary">{orderCode}</span>
              <button
                type="button"
                onClick={() => copyToClipboard(orderCode, "code")}
                className="text-secondary hover:opacity-80 p-0.5 cursor-pointer"
                title="Sao chép nội dung"
              >
                {copiedField === "code" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 w-full pt-1">
          <Button
            variant="primary"
            size="default"
            onClick={onConfirmTransfer}
            className="w-full"
            leftIcon={<CheckCircle2 className="h-4 w-4" />}
          >
            Tôi đã chuyển khoản xong
          </Button>

          {onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="w-full text-muted-foreground"
              leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}
            >
              Hủy hoặc quay lại
            </Button>
          )}
        </div>
      </div>
    );
  }
);
QRCodePayment.displayName = "QRCodePayment";
