import { TransactionCategory } from "../entities/transaction-category";

export interface ITransactionCategoryRepo {
  findAll(): Promise<TransactionCategory[]>;
}