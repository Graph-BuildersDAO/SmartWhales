import {Address, log} from "@graphprotocol/graph-ts";
import {Account, Protocol, Token, Vault} from "../generated/schema";
import {ERC20} from "../generated/factory/ERC20";
import {ERC20BYTES} from "../generated/factory/ERC20BYTES";
import {constants} from "./constants";
import {factory} from "../generated/factory/factory";

export function getProtocol(): Protocol {
  let protocol = Protocol.load(constants.FACTORY);

  if (!protocol) {
    protocol = new Protocol(constants.FACTORY);

    // Protocol Counters
    protocol.investCount = constants.BIGINT_ZERO;
    protocol.investedAmount = constants.BIGINT_ZERO;
    protocol.withdrawCount = constants.BIGINT_ZERO;
    protocol.withdrawnAmount = constants.BIGINT_ZERO;
    protocol.totalValueLocked = constants.BIGINT_ZERO;
    protocol.cumulativeUniqueUsers = 0;

    // ETH calls to get the withdrawal fee, trade fee and accepted token
    let _factory = factory.bind(constants.FACTORY);

    let try_tradeFee = _factory.try_tradeFee();
    let try_withdrawalFee = _factory.try_withdrawalFee();
    let try_accptedToken = _factory.try_acceptedToken();

    let tradeFee = try_tradeFee.reverted ? constants.BIGINT_ZERO : try_tradeFee.value;
    let withdrawalFee = try_withdrawalFee.reverted ? constants.BIGINT_ZERO : try_withdrawalFee.value;
    let acceptedToken = getOrCreateToken(try_accptedToken.reverted ? Address.fromString(constants.ADDRESS_ZERO) : try_accptedToken.value);

    protocol.tradeFee = tradeFee;
    protocol.withdrawalFee = withdrawalFee;
    protocol.acceptedToken = acceptedToken.id;
    protocol.save();
  }

  return protocol as Protocol;
}

export function getVault(address: Address): Vault {
  let vault = Vault.load(address)!;
  return vault as Vault;
}

export function getOrCreateToken(address: Address): Token {
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

export function GetOrCreateAccount(address: Address): Account {
  let account = Account.load(address);

  if (!account) {
    account = new Account(address);
    account.investedAmount = constants.BIGINT_ZERO;
    account.investCount = constants.BIGINT_ZERO;
    account.withdrawnAmount = constants.BIGINT_ZERO;
    account.withdrawCount = constants.BIGINT_ZERO;
    account.save();

    //incremenet protocol users
    let protocol = getProtocol();

    protocol.cumulativeUniqueUsers = protocol.cumulativeUniqueUsers + 1;
    protocol.save();
  }

  return account as Account;
}
