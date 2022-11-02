import { v4 as uuidv4 } from "uuid";
import { Account } from "../../../entities/account";
import { ApiError } from "../../../utils/api-error";
import { IAccountRepo } from "../../i-account-repo";

export class InMemoryAccountRepo implements IAccountRepo {
  private accounts: Account[] = [];

  setAccountsEmpty() {
    this.accounts = [];
  }

  async create(account: Account): Promise<void> {
    const req: Account = new Account(account, uuidv4());

    const exists = this.accounts.find((item) => {
      return item.description == account.description;
    });

    if (exists) throw ApiError.errorToAccessDB();

    this.accounts.push(req);
  }

  async deleteById(id: string): Promise<void> {
    const response = this.accounts.filter((item) => {
      return item.id != id;
    });

    this.accounts = response;
  }

  async findAll(): Promise<Account[]> {
    return this.accounts;
  }

  async findByDescription(description: string): Promise<Account | null> {
    const account = this.accounts.find(
      (account) => account.description == description
    );

    if (account) return account;
    return null;
  }

  async findById(id: string): Promise<Account | null> {
    const account = this.accounts.find((account) => account.id == id);

    if (account) return account;
    return null;
  }
}
