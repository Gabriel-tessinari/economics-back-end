import { Transaction } from "../entities/transaction";

export interface ITransactionRepo {
  create(transaction: Transaction): Promise<Transaction>;
  deleteById(id: string): Promise<void>;
  findByAccountId(accountId: string): Promise<Transaction[]>;
  findByAccountIdMonthYear(
    accountId: string,
    monthYear: string
  ): Promise<Transaction[]>;
  findByCategoryId(categoryId: string): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
}
