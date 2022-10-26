import { Category } from "../../../entities/category";
import { ICategoryRepo } from "../../../repositories/i-category-repo";

export class CreateCategoryService {
  constructor(
    private repo: ICategoryRepo
  ) {}

  async execute(req: Category) {
    await this.repo.create(req);
    return;
  }
}