import { v4 as uuidv4 } from "uuid";
import { Subcategory } from "../../../entities/subcategory";
import { ApiError } from "../../../utils/api-error";
import { ISubcategoryRepo } from "../../i-subcategory-repo";

export class InMemorySubcategoryRepo implements ISubcategoryRepo {
  private subcategories: Subcategory[] = [];

  setSubcategoriesEmpty() {
    this.subcategories = [];
  }

  async create(subcategory: Subcategory): Promise<void> {
    const req: Subcategory = new Subcategory(subcategory, uuidv4());

    const exists = this.subcategories.find((item) => {
      return item.description == subcategory.description;
    });

    if (exists) throw ApiError.errorToAccessDB();

    this.subcategories.push(req);
  }

  async deleteById(id: string): Promise<void> {
    const response = this.subcategories.filter((item) => {
      return item.id != id;
    });

    this.subcategories = response;
  }

  async findAll(): Promise<Subcategory[]> {
    return this.subcategories;
  }

  async findByDescription(description: string): Promise<Subcategory | null> {
    const subcategory = this.subcategories.find((item) => {
      return item.description == description;
    });

    if (subcategory) return subcategory;
    return null;
  }

  async findById(id: string): Promise<Subcategory | null> {
    const subcategory = this.subcategories.find((item) => {
      return item.id == id;
    });

    if (subcategory) return subcategory;
    return null;
  }
}
