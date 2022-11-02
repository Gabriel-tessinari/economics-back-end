import { Request, Response } from "express";
import { DeleteTransactionByIdService } from "./delete-transaction-by-id.service";

export class DeleteTransactionByIdController {
  constructor(private service: DeleteTransactionByIdService) {}

  async execute(req: Request, res: Response) {
    const id = req.params.id;

    try {
      await this.service.execute(id);
      return res.status(200).send("Transação excluída com sucesso.");
    } catch (err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}
