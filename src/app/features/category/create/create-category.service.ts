import { Category } from "../../../entities/category";
import { ICategoryRepo } from "../../../repositories/i-category-repo";
import { ApiError } from "../../../utils/api-error";

export class CreateCategoryService {
  constructor(private repo: ICategoryRepo) {}

  async execute(req: Category): Promise<Category> {
    req.toLowerCase();

    let response = new Category({
      description: "",
      subcategories: [],
    });

    const exists = await this.repo.findByDescription(req.description);

    if (!exists) response = await this.repo.create(req);
    else throw ApiError.businessLogicError("Categoria já existente.");
    return response;
  }
}
