import {
  AdminWithdraw,
  CopyTrade,
  FeeDistribution,
  Invest as InvestEvent,
  Paused,
  Purchased,
  Unpaused,
  Withdraw as WithdrawEvent,
  WithdrawTrade,
} from "../generated/factory/vault";
import {Invest, Withdraw} from "../generated/schema";
import {constants} from "./constants";
import {GetOrCreateAccount, getProtocol, getVault} from "./entity-factory";

export function handleCopyTrade(event: CopyTrade): void {}

export function handleInvest(event: InvestEvent): void {
  /*** GETTERS ***/
  let protocol = getProtocol();
  let vault = getVault(event.address);
  let account = GetOrCreateAccount(event.params.investor);

  /*** ANALYTICS UPDATES ***/
  // Protocol Incrementers
  protocol.investCount = protocol.investCount.plus(constants.BIGINT_ONE);
  protocol.investedAmount = protocol.investedAmount.plus(event.params.amount);
  protocol.save();

  // Vault Incrementers
  vault.investCount = vault.investCount.plus(constants.BIGINT_ONE);
  vault.investedAmount = vault.investedAmount.plus(event.params.amount);
  vault.save();

  // Account Incrementers
  account.investCount = account.investCount.plus(constants.BIGINT_ONE);
  account.investedAmount = account.investedAmount.plus(event.params.amount);
  account.save();

  /*** TIMESERIES ***/

  /*** EVENT DATA ***/
  let invest = new Invest(event.transaction.hash.toHexString() + "-" + event.logIndex.toString());

  invest.hash = event.transaction.hash;
  invest.eventLog = event.logIndex;
  invest.account = account.id;
  invest.amount = event.params.amount;
  invest.token = protocol.acceptedToken;
  invest.vault = vault.id;

  invest.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  /*** GETTERS ***/
  let protocol = getProtocol();
  let vault = getVault(event.address);
  let account = GetOrCreateAccount(event.params.withdrawer);

  /*** ANALYTICS UPDATES ***/
  // Protocol Incrementers
  protocol.withdrawCount = protocol.withdrawCount.plus(constants.BIGINT_ONE);
  protocol.withdrawnAmount = protocol.withdrawnAmount.plus(event.params.amount);
  protocol.save();

  // Vault Incrementers
  vault.withdrawCount = vault.withdrawCount.plus(constants.BIGINT_ONE);
  vault.withdrawnAmount = vault.withdrawnAmount.plus(event.params.amount);
  vault.save();

  // Account Incrementers
  account.withdrawCount = account.withdrawCount.plus(constants.BIGINT_ONE);
  account.withdrawnAmount = account.withdrawnAmount.plus(event.params.amount);
  account.save();

  /*** TIMESERIES ***/

  /*** EVENT DATA ***/
  let withdraw = new Withdraw(event.transaction.hash.toHexString() + "-" + event.logIndex.toString());

  withdraw.hash = event.transaction.hash;
  withdraw.eventLog = event.logIndex;
  withdraw.account = account.id;
  withdraw.amount = event.params.amount;
  withdraw.token = protocol.acceptedToken;
  withdraw.vault = vault.id;

  withdraw.save();
}

export function handlePurchased(event: Purchased): void {}

export function handleWithdrawTrade(event: WithdrawTrade): void {}

export function handleAdminWithdraw(event: AdminWithdraw): void {}

export function handleFeeDistribution(event: FeeDistribution): void {}

export function handlePaused(event: Paused): void {
  // Why is an account address emitted in this event?
  let vault = getVault(event.address);

  vault.isPaused = true;
  vault.save();
}

export function handleUnpaused(event: Unpaused): void {
  let vault = getVault(event.address);

  vault.isPaused = false;
  vault.save();
}
