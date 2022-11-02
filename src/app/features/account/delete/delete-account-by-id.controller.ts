import { Request, Response } from "express";
import { DeleteAccountByIdService } from "./delete-account-by-id.service";

export class DeleteAccountByIdController {
  constructor(private service: DeleteAccountByIdService) {}

  async execute(req: Request, res: Response) {
    const id = req.params.id;

    try {
      await this.service.execute(id);
      return res.status(200).send("Conta excluída com sucesso.");
    } catch (err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}
