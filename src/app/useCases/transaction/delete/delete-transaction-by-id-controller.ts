import { Request, Response } from "express";
import { DeleteTransactionByIdUseCase } from "./delete-transaction-by-id-usecase";

export class DeleteTransactionByIdController {
  constructor(
    private usecase: DeleteTransactionByIdUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const id = req.params.id;
    
    try {
      await this.usecase.execute(id);
      return res.status(200).send("Transação excluída com sucesso.");
    } catch(err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}