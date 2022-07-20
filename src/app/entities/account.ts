type Props = {
  description: string;
  total: number;
}

export class Account {
  protected _id?: string;
  public description: string;
  public total: number;

  public get id() {
    return this._id;
  }

  public constructor(props: Props, id?: string) {
    this._id = id;
    this.description = props.description;
    this.total = props.total;
  }
}