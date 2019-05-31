/**
 * WARNING!
 *
 * YenePay currently (at the time of this writing) has a critical bug.
 * So this will be just a legacy code, in case it ever gets needed in the future.
 *
 * NOTE IN CASE OF REMOVAL:
 *   The following dependencies were also installed to support this.
 *   You may also remove them if not used elsewhere in the project.
 *   They are:
 *     -> yenepaysdk
 *     -> deep-extend
 *     -> request
 *     -> @types/deep-extend
 *     -> @types/request
 *
 * @deprecated
 */

import * as ypco from 'yenepaysdk'
import { randomBytes } from 'crypto'

export type ICheckoutOptions = {
  /**
   * Your User Code in YenePay
   */
  sellerCode: string

  /**
   * Unique ID that identifies this order on your system
   * @default A 64 characters long random string
   */
  orderId?: string
  /**
   * Testing Environment?
   * @default true, unless a YENEPAY_USE_SANDBOX=true|false env var exists or NODE_ENV is set to true
   */
  useSandbox?: boolean
  /**
   * Number of minutes before the order expires
   * @default 60 * 24 minutes (i.e. 24hrs)
   */
  expiresAfter?: number

  /**
   * Payment Success Return URL
   */
  successUrlReturn?: string
  /**
   * Payment Cancel Return URL
   */
  cancelUrlReturn?: string
  /**
   * Payment Completion Notification URL (Instant Payment Notification)
   */
  ipnUrlReturn?: string
  /**
   * Payment Failure Return URL
   */
  failureUrl?: string
}

export type ICheckoutItem = {
  ItemName: string
  UnitPrice: number
  Quantity?: number

  DeliveryFee?: number
  Discount?: number
  Tax1?: number
  Tax2?: number
  HandlingFee?: number
}

/**
 * @returns The Checkout URL
 */
export async function checkoutExpress(
  options: ICheckoutOptions,
  item: ICheckoutItem
): Promise<string> {
  const {
    sellerCode,
    orderId = randomBytes(48).toString('base64'),
    useSandbox = !(
      process.env.YENEPAY_USE_SANDBOX === 'false' || process.env.NODE_ENV === 'production'
    ),
    expiresAfter = 60 * 24,
    successUrlReturn,
    cancelUrlReturn,
    ipnUrlReturn,
    failureUrl
  } = options

  return ypco.checkout.GetCheckoutUrlForExpress(
    ypco.checkoutOptions(
      sellerCode,
      orderId,
      ypco.checkoutType.Express,
      useSandbox,
      expiresAfter,
      successUrlReturn,
      cancelUrlReturn,
      ipnUrlReturn,
      failureUrl
    ),
    item
  )
}
