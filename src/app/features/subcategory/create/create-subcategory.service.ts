import { Subcategory } from "../../../entities/subcategory";
import { ISubcategoryRepo } from "../../../repositories/i-subcategory-repo";
import { ApiError } from "../../../utils/api-error";

export class CreateSubcategoryService {
  constructor(private repo: ISubcategoryRepo) {}

  async execute(req: Subcategory) {
    req.toLowerCase();

    const exists = await this.repo.findByDescription(req.description);

    if (!exists) await this.repo.create(req);
    else throw ApiError.businessLogicError("Subcategoria já existente.");
    return;
  }
}
