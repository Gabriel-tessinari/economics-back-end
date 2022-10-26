import { Request, Response } from "express";
import { TransactionCategory } from "../../../entities/transaction-category";
import { CreateCategoryService } from "./create-category.service";

export class CreateCategoryController {
  constructor(
    private service: CreateCategoryService
  ) {}

  async execute(req: Request, res: Response) {
    const category = new TransactionCategory(req.body);
    
    try {
      await this.service.execute(category);
      return res.status(201).send("Categoria adicionada com sucesso.");
    } catch(err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}