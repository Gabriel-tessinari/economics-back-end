import { v4 as uuidv4 } from "uuid";
import { TransactionCategory } from "../../../entities/transaction-category";
import { ApiError } from "../../../utils/api-error";
import { ICategoryRepo } from "../../i-category-repo";

export class InMemoryCategoryRepo implements ICategoryRepo {
  private categories: TransactionCategory[] = [];

  setCategoriesEmpty() {
    this.categories = [];
  }

  async create(category: TransactionCategory): Promise<void> {
    const req: TransactionCategory = new TransactionCategory(category, uuidv4());

    const exists = this.categories.find(item => {
      return item.description == category.description;
    });

    if(exists) throw ApiError.errorToAccessDB();

    this.categories.push(req);
  }

  async deleteById(id: string): Promise<void> {
    const response = this.categories.filter(item => {
      return item.id != id;
    });

    this.categories = response;
  }

  async findAll(): Promise<TransactionCategory[]> {
    return this.categories;
  }

  async findById(id: string): Promise<TransactionCategory | null> {
    const category = this.categories.find(item => {
      return item.id == id;
    });

    if(category) return category;
    return null;
  }
}