import { Request, Response } from "express";
import { Account } from "../../../entities/account";
import { DeleteAccountByIdUseCase } from "./delete-account-by-id-usecase";

export class DeleteAccountByIdController {
  constructor(
    private usecase: DeleteAccountByIdUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const account = new Account(req.body);
    
    try {
      await this.usecase.execute(account);
      return res.status(200).send("Conta excluída com sucesso.");
    } catch(err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}