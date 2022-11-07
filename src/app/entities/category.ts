import { Subcategory } from "./subcategory";

type Props = {
  description: string;
  subcategories?: Subcategory[];
};

export class Category {
  protected _id?: string;
  public description: string;
  public subcategories: Subcategory[];

  public get id() {
    return this._id;
  }

  public constructor(props: Props, id?: string) {
    this._id = id;
    this.description = props.description;

    props.subcategories
      ? (this.subcategories = props.subcategories)
      : (this.subcategories = []);
  }

  public toLowerCase() {
    this.description = this.description.toLowerCase();
  }
}
