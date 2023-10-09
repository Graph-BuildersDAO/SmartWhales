import {Address, log} from "@graphprotocol/graph-ts";
import {Protocol, Token} from "../generated/schema";
import {ERC20} from "../generated/factory/ERC20";
import {ERC20BYTES} from "../generated/factory/ERC20BYTES";
import {constants} from "./constants";

export function getProtocol(): Protocol {
  let protocol = Protocol.load(constants.FACTORY);

  if (!protocol) {
    protocol = new Protocol(constants.FACTORY);
    protocol.totalDeposits = constants.BIGINT_ZERO;
    protocol.totalDepositAmount = constants.BIGINT_ZERO;
    protocol.totalValueLocked = constants.BIGINT_ZERO;
    protocol.tradeFee = constants.BIGINT_ZERO;
    protocol.withdrawalFee = constants.BIGINT_ZERO;
    protocol.acceptedToken = [];
    protocol.save();
  }

  return protocol as Protocol;
}

export function GetOrCreateToken(address: Address): Token {
  let token = Token.load(address);

  if (!token) {
    let _erc20 = ERC20.bind(address);
    let _erc20Bytes = ERC20BYTES.bind(address);
    let try_name = _erc20.try_name();
    let try_symbol = _erc20.try_symbol();
    let try_decimals = _erc20.try_decimals();

    let try_nameBytes = _erc20Bytes.try_name();
    let try_symbolBytes = _erc20Bytes.try_symbol();

    let name_issue = "Error";
    let symbol_issue = "Error";

    if (!try_nameBytes.reverted) {
      name_issue = try_nameBytes.value.toString();
    }
    if (!try_symbolBytes.reverted) {
      symbol_issue = try_symbolBytes.value.toString();
    }

    // ETH calls to build out token
    token = new Token(address);
    token.name = try_name.reverted ? name_issue : try_name.value;
    token.symbol = try_symbol.reverted ? symbol_issue : try_symbol.value;
    token.decimals = try_decimals.reverted ? 18 : try_decimals.value;

    // if token calls revert, log error.
    if (token.name == "Error" || token.symbol == "Error") {
      log.error("issue with token {}", [address.toHexString()]);
    }
  }

  //Save token to store
  token.save();

  return token as Token;
}
