import { v4 as uuidv4 } from "uuid";
import { Category } from "../../../entities/category";
import { ApiError } from "../../../utils/api-error";
import { ICategoryRepo } from "../../i-category-repo";

export class InMemoryCategoryRepo implements ICategoryRepo {
  private categories: Category[] = [];

  setCategoriesEmpty() {
    this.categories = [];
  }

  async create(category: Category): Promise<Category> {
    const req: Category = new Category(category, uuidv4());

    const exists = this.categories.find((item) => {
      return item.description == category.description;
    });

    if (exists) throw ApiError.errorToAccessDB();

    this.categories.push(req);

    return req;
  }

  async deleteById(id: string): Promise<void> {
    const response = this.categories.filter((item) => {
      return item.id != id;
    });

    this.categories = response;
  }

  async existsByDescription(description: string): Promise<boolean> {
    return !!this.categories.find((item) => {
      return item.description == description;
    });
  }

  async existsById(id: string): Promise<boolean> {
    return !!this.categories.find((item) => {
      return item.id == id;
    });
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async hasSubcategory(id: string): Promise<boolean> {
    const category = this.categories.find((item) => {
      return item.id == id;
    });

    if (category) return category.subcategories.length > 0;
    return false;
  }
}
