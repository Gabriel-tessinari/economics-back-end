import { Category } from "../entities/category";

export interface ICategoryRepo {
  create(category: Category): Promise<Category>;
  deleteById(id: string): Promise<void>;
  existsByDescription(description: string): Promise<boolean>;
  existsById(id: string): Promise<boolean>;
  findAll(): Promise<Category[]>;
  hasSubcategory(id: string): Promise<boolean>;
}
