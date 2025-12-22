export const PaymentStatus = {
  Pending: "pending",
  Paid: "paid",
  Canceled: "canceled",
  Refunded: "refunded",
  Failed: "failed",
} as const

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]
