import { Subcategory } from "../../../entities/subcategory";
import { ISubcategoryRepo } from "../../../repositories/i-subcategory-repo";

export class FindAllSubcategoryService {
  constructor(private repo: ISubcategoryRepo) {}

  async execute(): Promise<Subcategory[]> {
    let response = await this.repo.findAll();
    return response;
  }
}
