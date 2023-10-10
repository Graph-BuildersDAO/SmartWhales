import {CreateVault, UpdatedFee, UpdatedAcceptedToken, UpdatedTierData, Upgraded} from "../generated/factory/factory";
import {Vault} from "../generated/schema";
import {Vault as VaultTemplate} from "../generated/templates";
import {constants} from "./constants";
import {getProtocol} from "./entity-factory";

export function handleCreateVault(event: CreateVault): void {
  let protocol = getProtocol();

  let vault = new Vault(event.params.vaultAddress);
  vault.type = "type";
  vault.protocol = protocol.id;
  vault.AUM = constants.BIGDECIMAL_ZERO;
  vault.tokenBalances = constants.BIGINT_ZERO;
  vault.investCount = constants.BIGINT_ZERO;
  vault.investedAmount = constants.BIGINT_ZERO;
  vault.withdrawCount = constants.BIGINT_ZERO;
  vault.withdrawnAmount = constants.BIGINT_ZERO;
  vault.createdAt = event.block.timestamp;
  vault.latestDailySnapshot = "";
  vault.isPaused = false;

  vault.save();

  VaultTemplate.create(event.params.vaultAddress);
}

export function handleUpdatedAcceptedToken(event: UpdatedAcceptedToken): void {
  let protocol = getProtocol();

  protocol.acceptedToken = event.params.acceptedToken;
  protocol.save();
}

export function handleUpdatedFee(event: UpdatedFee): void {
  let protocol = getProtocol();

  protocol.tradeFee = event.params.tradeFee;
  protocol.withdrawalFee = event.params.withdrawalFee;

  protocol.save();
}

export function handleUpdatedTierData(event: UpdatedTierData): void {}
