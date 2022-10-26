import { Category } from "../entities/category";

export interface ICategoryRepo {
  create(category: Category): Promise<void>;
  deleteById(id: string): Promise<void>;
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
}