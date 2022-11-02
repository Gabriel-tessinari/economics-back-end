import { Category } from "../../../entities/category";
import { ICategoryRepo } from "../../../repositories/i-category-repo";
import { ApiError } from "../../../utils/api-error";

export class CreateCategoryService {
  constructor(private repo: ICategoryRepo) {}

  async execute(req: Category) {
    req.toLowerCase();

    const exists = await this.repo.findByDescription(req.description);

    if (!exists) await this.repo.create(req);
    else throw ApiError.businessLogicError("Categoria já existente.");
    return;
  }
}
