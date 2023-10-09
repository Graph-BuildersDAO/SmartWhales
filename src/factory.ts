import {
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  CreateVault,
  Upgraded as UpgradedEvent,
  UpdatedFee,
  UpdatedAcceptedToken,
  UpdatedTierData,
  Upgraded,
} from "../generated/factory/factory";
import {} from "../generated/schema";

export function handleCreateVault(event: CreateVault): void {}
export function handleUpdatedAcceptedToken(event: UpdatedAcceptedToken): void {}
export function handleUpdatedFee(event: UpdatedFee): void {}
export function handleUpdatedTierData(event: UpdatedTierData): void {}
export function handleUpgraded(event: Upgraded): void {}
