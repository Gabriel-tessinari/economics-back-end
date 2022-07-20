import { Request, Response } from "express";
import { FindByAccountIdAndDateMonthUseCase } from "./find-by-accountid-and-datemonth-usecase";

export class FindByAccountIdAndDateMonthController {
  constructor(
    private usecase: FindByAccountIdAndDateMonthUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const accountId = req.params.accountId;
    const month = req.params.month;

    try {
      const response = await this.usecase.execute(accountId, month);
      return res.status(200).send(response);
    } catch(err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}