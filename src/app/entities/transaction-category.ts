type Props = {
  description: string;
}

export class TransactionCategory {
  protected _id?: string;
  public description: string;

  public get id() {
    return this._id;
  }

  public constructor(props: Props, id?: string) {
    this._id = id;
    this.description = props.description;
  }
}