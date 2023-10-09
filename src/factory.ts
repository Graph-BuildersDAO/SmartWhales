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
  vault.depositCount = constants.BIGINT_ZERO;
  vault.withdrawCount = constants.BIGINT_ZERO;
  vault.createdAt = event.block.timestamp;
  vault.latestDailySnapshot = "";

  vault.save();

  VaultTemplate.create(event.params.vaultAddress);
}

export function handleUpdatedAcceptedToken(event: UpdatedAcceptedToken): void {
  let protocol = getProtocol();

  let acceptedTokens = protocol.acceptedToken;
  if (acceptedTokens.length > 0) {
    acceptedTokens.push(event.params.acceptedToken);
  } else {
    acceptedTokens = [event.params.acceptedToken];
  }

  protocol.acceptedToken = acceptedTokens;
  protocol.save();
}

export function handleUpdatedFee(event: UpdatedFee): void {
  let protocol = getProtocol();

  protocol.tradeFee = event.params.tradeFee;
  protocol.withdrawalFee = event.params.withdrawalFee;

  protocol.save();
}

export function handleUpdatedTierData(event: UpdatedTierData): void {}
