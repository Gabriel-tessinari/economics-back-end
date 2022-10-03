import { Account } from "../entities/account";

export interface IAccountRepo {
  create(account: Account): Promise<void>;
  findAll(): Promise<Account[]>;
}