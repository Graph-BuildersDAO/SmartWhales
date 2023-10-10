import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export namespace constants {
  export const BIGINT_ZERO = BigInt.fromI32(0);
  export const BIGINT_ONE = BigInt.fromI32(1);
  export const BIGINT_TEN = BigInt.fromI32(10);
  export const BIGDECIMAL_ZERO = new BigDecimal(constants.BIGINT_ZERO);
  export const BIGDECIMAL_ONE = new BigDecimal(constants.BIGINT_ONE);
  export const BIGDECIMAL_TEN = new BigDecimal(constants.BIGINT_TEN);
  export const BIGDECIMAL_1M = new BigDecimal(BigInt.fromI32(1000000000));
  export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
  export const BYTES32_ZERO =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
  export const NUM_OF_BLOCKS_TO_CHECK_IN = BIGINT_TEN;
  export const USDC_ADDRESS = Address.fromString(
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  );
  export const WETH_ADDRESS = Address.fromString(
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  );
  export const FACTORY = Address.fromString(
    "0x96356d414a925FC98bEe2e1954bab6971FF99825"
  );
}
