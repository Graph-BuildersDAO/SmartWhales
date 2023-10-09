import {Address, BigDecimal, BigInt} from "@graphprotocol/graph-ts";

export namespace constants {
  export const BIGINT_ZERO = BigInt.fromI32(0);
  export const BIGINT_ONE = BigInt.fromI32(1);
  export const BIGINT_TEN = BigInt.fromI32(10);
  export const BIGDECIMAL_ZERO = new BigDecimal(constants.BIGINT_ZERO);
  export const BIGINT_HUNDRED = BigInt.fromI32(100);
  export const BIGINT_TWOFIFTY = BigInt.fromI32(250);
  export const BIGINT_THOUSAND = BigInt.fromI32(1000);
  export const BIGDECIMAL_ONE = new BigDecimal(constants.BIGINT_ONE);
  export const BIGDECIMAL_TEN = new BigDecimal(constants.BIGINT_TEN);
  export const BIGDECIMAL_1M = new BigDecimal(BigInt.fromI32(1000000000));
  export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
  export const BYTES32_ZERO = "0x0000000000000000000000000000000000000000000000000000000000000000";
  export const NUM_OF_BLOCKS_TO_CHECK_IN = BIGINT_THOUSAND;
  export const SILOREPOSITORY = "0x8658047e48CC09161f4152c79155Dac1d710Ff0a";
  export const SILOLENS = "0x07b94eB6AaD663c4eaf083fBb52928ff9A15BE47";
  export const USDC_ADDRESS = Address.fromString("0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8");
  export const WETH_ADDRESS = Address.fromString("0x82aF49447D8a07e3bd95BD0d56f35241523fBab1");
  export const PRICEPROVIDER = Address.fromString("0x5bf4E67127263D951FC515E23B323d0e3b4485fd");
  export const DAO_ADDRESS = ADDRESS_ZERO;
  export const XAI = ADDRESS_ZERO;
  export const LAST_DEPOSIT_BLOCK = BigInt.fromI32(86548216);
}
