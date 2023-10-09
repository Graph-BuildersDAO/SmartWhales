import {
  AdminWithdraw,
  CopyTrade,
  FeeDistribution,
  Invest,
  Paused,
  Purchased,
  TokensApproved,
  Unpaused,
  Withdraw,
  WithdrawTrade,
} from "../generated/factory/vault";

export function handleAdminWithdraw(event: AdminWithdraw): void {}
export function handleCopyTrade(event: CopyTrade): void {}
export function handleFeeDistribution(event: FeeDistribution): void {}
export function handleInvest(event: Invest): void {}
export function handlePaused(event: Paused): void {}
export function handlePurchased(event: Purchased): void {}
export function handleTokensApproved(event: TokensApproved): void {}
export function handleUnpaused(event: Unpaused): void {}
export function handleWithdraw(event: Withdraw): void {}
export function handleWithdrawTrade(event: WithdrawTrade): void {}
