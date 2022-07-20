import { Transaction } from "../entities/transaction";

export interface ITransactionRepo {
  create(transaction: Transaction): Promise<void>;
  findByAccountIdAndDateMonth(accountId: string, dateMonth: string): Promise<Transaction[]>;
}