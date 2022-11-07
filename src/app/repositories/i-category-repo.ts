import { Category } from "../entities/category";

export interface ICategoryRepo {
  create(category: Category): Promise<Category>;
  deleteById(id: string): Promise<void>;
  findAll(): Promise<Category[]>;
  findByDescription(description: string): Promise<Category | null>;
  findById(id: string): Promise<Category | null>;
}
