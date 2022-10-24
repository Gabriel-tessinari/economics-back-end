import { TransactionType } from "../../../app/entities/enums/transaction-type";
import { Transaction } from "../../../app/entities/transaction";
import { InMemoryTransactionRepo } from "../../../app/repositories/implementations/in-memory/in-memory-transaction-repo";
import { CreateTransactionUseCase } from "../../../app/useCases/transaction/create/create-transaction-usecase";

describe('Create transaction', () => {
  let repo: InMemoryTransactionRepo;
  let useCase: CreateTransactionUseCase;

  beforeAll(() => {
    repo = new InMemoryTransactionRepo();
    useCase = new CreateTransactionUseCase(repo);
  });

  it('should be able to create a transaction', async () => {
    const accountId: string = 'accountIdTest';
    const monthYear: string = '10/2022';
    const transaction = new Transaction({
      description: 'Test',
      date: '23/' + monthYear,
      type: TransactionType.DEBIT,
      value: 18.02,
      accountId: accountId,
      categoryId: 'categoryIdTest'
    });

    expect((await repo.findByAccountIdAndDateMonthYear(accountId, monthYear)).length).toBe(0);
    expect(await useCase.execute(transaction)).toBeUndefined();
    expect((await repo.findByAccountIdAndDateMonthYear(accountId, monthYear)).length).toBe(1);
  });
});