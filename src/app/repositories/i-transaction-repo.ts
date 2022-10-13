import { Transaction } from "../entities/transaction";

export interface ITransactionRepo {
  create(transaction: Transaction): Promise<void>;
  findByAccountIdAndDateMonthYear(accountId: string, monthYear: string): Promise<Transaction[]>;
}