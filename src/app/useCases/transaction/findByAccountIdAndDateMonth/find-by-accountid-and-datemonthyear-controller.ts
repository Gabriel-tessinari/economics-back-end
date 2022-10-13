import { Request, Response } from "express";
import { FindByAccountIdAndDateMonthYearUseCase } from "./find-by-accountid-and-datemonthyear-usecase";

export class FindByAccountIdAndDateMonthYearController {
  constructor(
    private usecase: FindByAccountIdAndDateMonthYearUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const accountId = req.params.accountId;
    const month = req.params.month;
    const year = parseInt(req.params.year);

    try {
      const response = await this.usecase.execute(accountId, month, year);
      return res.status(200).send(response);
    } catch(err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}