import { z } from "zod";

export const TRANSACTION_STATUSES = [
  "PENDING",
  "SUCCESS",
  "FAILED",
  "EXPIRED",
  "REFUNDED",
  "PARTIALLY_REFUNDED",
] as const;
export type PaymentStatus = (typeof TRANSACTION_STATUSES)[number];

export const CreatePaymentOrderRequestSchema = z.object({
  contractCode: z.string(),
  paymentMethod: z.enum([
    "VIETQR",
    "VNPAY",
    "MOMO",
    "BANK_TRANSFER",
    "MANUAL_CASH",
  ]),
  returnUrl: z.string().url().optional(),
});
export type CreatePaymentOrderRequest = z.infer<
  typeof CreatePaymentOrderRequestSchema
>;

export const VietQRPaymentSchema = z.object({
  orderCode: z.string(),
  contractCode: z.string(),
  amountVnd: z.number(),
  qrContent: z.string(),
  qrImage: z.string().url(),
  beneficiaryAccount: z.string(),
  beneficiaryBank: z.string(),
  transferContent: z.string(),
  expiresAt: z.string(),
});
export type VietQRPayment = z.infer<typeof VietQRPaymentSchema>;
