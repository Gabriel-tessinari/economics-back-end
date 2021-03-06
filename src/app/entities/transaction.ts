import { ObjectId } from 'bson';
import { Account } from './account';
import { TransactionType } from './enums/transaction-type';
import { TransactionCategory } from './transaction-category';
import { TransactionSubcategory } from './transaction-subcategory';

type Props = {
  description: string;
  value: number;
  date: string;
  type: TransactionType;
  accountId: string;
  categoryId: string;
  subcategoryId?: string;
  account?: Account;
  category?: TransactionCategory;
  subcategory?: TransactionSubcategory;
}

export class Transaction {
  protected _id: string;
  public description: string;
  public value: number;
  public date: string;
  public type: TransactionType;
  public accountId: string;
  public categoryId: string;
  public subcategoryId?: string;
  public account?: Account;
  public category?: TransactionCategory;
  public subcategory?: TransactionSubcategory;

  public get id() {
    return this._id;
  }

  public constructor(props: Props, id?: string) {
    id? this._id = id : this._id = new ObjectId().toString();
    this.description = props.description;
    this.value = props.value;
    this.date = props.date;
    this.type = props.type;
    this.accountId = props.accountId;
    this.categoryId = props.categoryId;
    this.subcategoryId = props.subcategoryId;
    this.account = props.account;
    this.category = props.category;
    this.subcategory = props.subcategory;
  }
}