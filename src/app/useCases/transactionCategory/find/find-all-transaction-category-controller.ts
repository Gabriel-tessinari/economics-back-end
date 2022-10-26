import { Request, Response } from "express";
import { FindAllTransactionCategoryUseCase } from "./find-all-transaction-category-usecase";

export class FindAllTransactionCategoryController {
  constructor(
    private usecase: FindAllTransactionCategoryUseCase
  ) {}

  async execute(req: Request, res: Response) {
    try {
      const response = await this.usecase.execute();
      return res.status(200).send(response);
    } catch(err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}