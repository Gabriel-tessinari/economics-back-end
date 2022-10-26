import { ITransactionCategoryRepo } from "../../../repositories/i-transaction-category-repo";

export class DeleteTransactionCategoryByIdUseCase {
  constructor(
    private repo: ITransactionCategoryRepo
  ) {}

  async execute(id: string) {
    if(await this.repo.findById(id)) {
      await this.repo.deleteById(id);
    }

    return;
  }
}