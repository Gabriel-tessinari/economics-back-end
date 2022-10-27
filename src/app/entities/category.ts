type Props = {
  description: string;
}

export class Category {
  protected _id?: string;
  public description: string;

  public get id() {
    return this._id;
  }

  public constructor(props: Props, id?: string) {
    this._id = id;
    this.description = props.description;
  }

  public toLowerCase() {
    this.description = this.description.toLowerCase();
  }
}