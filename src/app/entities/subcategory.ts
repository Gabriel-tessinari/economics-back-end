import { FakeDataGenerator } from "../utils/fake-data-generator";
import { Category } from "./category";

type Props = {
  description: string;
  categoryId: string;
  category?: Category;
};

export class Subcategory {
  protected _id?: string;
  public description: string;
  public categoryId: string;
  public category?: Category;

  public get id() {
    return this._id;
  }

  public constructor(props: Props, id?: string) {
    this._id = id;
    this.description = props.description;
    this.categoryId = props.categoryId;
    this.category = props.category;
  }

  public toLowerCase() {
    this.description = this.description.toLowerCase();
  }

  public static fake(): Subcategory {
    return new Subcategory({
      description: FakeDataGenerator.genString(),
      categoryId: FakeDataGenerator.genString(),
    });
  }
}
