import { Account } from "../entities/account";

export interface IAccountRepo {
  create(account: Account): Promise<void>;
  deleteById(id: string): Promise<void>;
  findAll(): Promise<Account[]>;
  findByDescription(description: string): Promise<Account | null>;
  findById(id: string): Promise<Account | null>;
}
