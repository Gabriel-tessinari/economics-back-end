import { Request, Response } from "express";
import { DeleteTransactionCategoryByIdUseCase } from "./delete-transaction-category-by-id-usecase";

export class DeleteTransactionCategoryByIdController {
  constructor(
    private usecase: DeleteTransactionCategoryByIdUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const id = req.params.id;
    
    try {
      await this.usecase.execute(id);
      return res.status(200).send("Categoria excluída com sucesso.");
    } catch(err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}