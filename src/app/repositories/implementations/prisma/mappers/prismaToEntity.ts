import { 
  Account as AccountDB, 
  Category, 
  Subcategory as SubcategoryDB, 
  Transaction as TransactionDB 
} from "@prisma/client";
import { Account } from "../../../../entities/account";
import { TransactionType } from "../../../../entities/enums/transaction-type";
import { Transaction } from "../../../../entities/transaction";
import { TransactionCategory } from "../../../../entities/transaction-category";
import { Subcategory } from "../../../../entities/subcategory";

export class PrismaToEntity {
  static account(accountDB: AccountDB): Account {
    return new Account(
      {
        description: accountDB.description,
        total: accountDB.total
      },
      accountDB.id
    );
  }

  static category(categoryDB: Category): TransactionCategory {
    return new TransactionCategory(
      { description: categoryDB.description }, 
      categoryDB.id
    );
  }

  static subcategory(subcategoryDB: SubcategoryDB): Subcategory {
    return new Subcategory(
      { 
        description: subcategoryDB.description,
        categoryId: subcategoryDB.categoryId
      },
      subcategoryDB.id
    );
  }

  static transaction(
    transactionDB: TransactionDB, 
    accountDB: AccountDB, 
    categoryDB: Category, 
    subcategoryDB?: SubcategoryDB | null
  ): Transaction {
    let account = PrismaToEntity.account(accountDB);
    let category = PrismaToEntity.category(categoryDB);
    let subcategory: Subcategory | undefined;
    let subcategoryId: string | undefined;
    
    transactionDB.subcategoryId? 
    subcategoryId = transactionDB.subcategoryId : 
    subcategoryId = undefined;
    
    subcategoryDB?
    subcategory = PrismaToEntity.subcategory(subcategoryDB) :
    subcategory = undefined;

    return new Transaction(
      {
        description: transactionDB.description,
        value: transactionDB.value,
        date: transactionDB.date,
        type: transactionDB.type as TransactionType,
        accountId: transactionDB.accountId,
        categoryId: transactionDB.categoryId,
        subcategoryId: subcategoryId,
        account: account,
        category: category,
        subcategory: subcategory
      },
      transactionDB.id
    );
  }
}