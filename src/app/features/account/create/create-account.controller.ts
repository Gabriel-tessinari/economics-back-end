import { Request, Response } from "express";
import { Account } from "../../../entities/account";
import { CreateAccountService } from "./create-account.service";

export class CreateAccountController {
  constructor(private service: CreateAccountService) {}

  async execute(req: Request, res: Response) {
    const account = new Account(req.body);

    try {
      await this.service.execute(account);
      return res.status(201).send("Conta adicionada com sucesso.");
    } catch (err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}
