import { Subcategory } from "../entities/subcategory";

export interface ISubcategoryRepo {
  create(subcategory: Subcategory): Promise<void>;
  deleteById(id: string): Promise<void>;
  findAll(): Promise<Subcategory[]>;
  findByCategoryId(categoryId: string): Promise<Subcategory[]>;
  findByDescription(description: string): Promise<Subcategory | null>;
  findById(id: string): Promise<Subcategory | null>;
}
