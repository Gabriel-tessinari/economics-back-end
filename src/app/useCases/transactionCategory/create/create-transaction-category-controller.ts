import { Request, Response } from "express";
import { TransactionCategory } from "../../../entities/transaction-category";
import { CreateTransactionCategoryUseCase } from "./create-transaction-category-usecase";

export class CreateTransactionCategoryController {
  constructor(
    private usecase: CreateTransactionCategoryUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const category = new TransactionCategory(req.body);
    
    try {
      await this.usecase.execute(category);
      return res.status(201).send("Categoria adicionada com sucesso.");
    } catch(err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}