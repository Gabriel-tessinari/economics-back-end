import { Request, Response } from "express";
import { Transaction } from "../../../entities/transaction";
import { CreateTransactionUseCase } from "./create-transaction-usecase";

export class CreateTransactionController {
  constructor(
    private usecase: CreateTransactionUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const transaction = new Transaction(req.body);
    
    try {
      await this.usecase.execute(transaction);
      return res.status(201).send("Transação adicionada com sucesso.");
    } catch(err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}