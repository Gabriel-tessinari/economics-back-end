import { Account } from "../entities/account";

export interface IAccountRepo {
  findAll(): Promise<Account[]>;
}