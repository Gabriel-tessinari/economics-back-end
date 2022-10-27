import { v4 as uuidv4 } from "uuid";
import { Transaction } from "../../../entities/transaction";
import { ITransactionRepo } from "../../i-transaction-repo";

export class InMemoryTransactionRepo implements ITransactionRepo {
  private transactions: Transaction[] = [];

  setTransactionsEmpty() {
    this.transactions = [];
  }

  async create(transaction: Transaction): Promise<void> {
    const req: Transaction = new Transaction(transaction, uuidv4());

    this.transactions.push(req);
  }

  async deleteById(id: string): Promise<void> {
    const response = this.transactions.filter((item) => {
      return item.id != id;
    });

    this.transactions = response;
  }

  async findByAccountIdMonthYear(
    accountId: string,
    monthYear: string
  ): Promise<Transaction[]> {
    const response: Transaction[] = [];

    this.transactions.map((item) => {
      if (item.accountId == accountId && item.date.includes(monthYear)) {
        response.push(item);
      }
    });

    return response;
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = this.transactions.find((item) => {
      return item.id == id;
    });

    if (transaction) return transaction;
    return null;
  }
}
