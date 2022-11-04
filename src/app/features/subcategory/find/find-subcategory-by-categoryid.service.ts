import { Subcategory } from "../../../entities/subcategory";
import { ISubcategoryRepo } from "../../../repositories/i-subcategory-repo";

export class FindSubcategoryByCategoryIdService {
  constructor(private repo: ISubcategoryRepo) {}

  async execute(categoryId: string): Promise<Subcategory[]> {
    let response = await this.repo.findByCategoryId(categoryId);
    return response;
  }
}
