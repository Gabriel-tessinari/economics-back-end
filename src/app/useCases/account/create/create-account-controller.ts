import { Request, Response } from "express";
import { Account } from "../../../entities/account";
import { CreateAccountUseCase } from "./create-account-usecase";

export class CreateAccountController {
  constructor(
    private usecase: CreateAccountUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const account = new Account(req.body);
    
    try {
      await this.usecase.execute(account);
      return res.status(201).send("Conta adicionada com sucesso.");
    } catch(err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}