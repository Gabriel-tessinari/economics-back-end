import { Category } from "../../../entities/category";
import { ICategoryRepo } from "../../../repositories/i-category-repo";

export class FindAllCategoryService {
  constructor(private repo: ICategoryRepo) {}

  async execute(): Promise<Category[]> {
    let response = await this.repo.findAll();
    return response;
  }
}
