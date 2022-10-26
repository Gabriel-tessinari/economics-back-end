type Props = {
  description: string;
  categoryId: string;
}

export class Subcategory {
  protected _id?: string;
  public description: string;
  public categoryId: string;

  public get id() {
    return this._id;
  }

  public constructor(props: Props, id?: string) {
    this._id = id;
    this.description = props.description;
    this.categoryId = props.categoryId;
  }
}