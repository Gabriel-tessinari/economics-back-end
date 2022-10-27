import { ICategoryRepo } from "../../../repositories/i-category-repo";

export class DeleteCategoryByIdService {
  constructor(private repo: ICategoryRepo) {}

  async execute(id: string) {
    if (await this.repo.findById(id)) {
      await this.repo.deleteById(id);
    }

    return;
  }
}
