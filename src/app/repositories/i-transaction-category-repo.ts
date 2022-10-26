import { TransactionCategory } from "../entities/transaction-category";

export interface ITransactionCategoryRepo {
  create(category: TransactionCategory): Promise<void>;
  deleteById(id: string): Promise<void>;
  findAll(): Promise<TransactionCategory[]>;
  findById(id: string): Promise<TransactionCategory | null>;
}