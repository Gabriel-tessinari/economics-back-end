import { Request, Response } from "express";
import { Transaction } from "../../../entities/transaction";
import { CreateTransactionService } from "./create-transaction.service";

export class CreateTransactionController {
  constructor(private service: CreateTransactionService) {}

  async execute(req: Request, res: Response) {
    const transaction = new Transaction(req.body);

    try {
      const response = await this.service.execute(transaction);
      return res.status(201).send(response);
    } catch (err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}
