import { Transaction } from "../entities/transaction";

export interface ITransactionRepo {
  create(transaction: Transaction): Promise<void>;
  deleteById(id: string): Promise<void>;
  findByAccountIdMonthYear(
    accountId: string,
    monthYear: string
  ): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
}
