import { v4 as uuidv4 } from "uuid";
import { Account } from "../../../entities/account";
import { IAccountRepo } from "../../i-account-repo";

export class InMemoryAccountRepo implements IAccountRepo {
  private accounts: Account[] = [];

  async create(account: Account): Promise<void> {
    const req: Account = new Account(account, uuidv4());

    this.accounts.push(req);
  }

  async deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Account[]> {
    return this.accounts;
  }

  async findByDescription(description: string): Promise<Account | null> {
    const account = this.accounts.find(account => account.description == description);

    if(account) return account;
    return null;
  }
}