import { Request, Response } from "express";
import { FindTransactionByAccountIdMonthYearService } from "./find-transaction-by-accountid-month-year.service";

export class FindTransactionByAccountIdMonthYearController {
  constructor(private service: FindTransactionByAccountIdMonthYearService) {}

  async execute(req: Request, res: Response) {
    const accountId = req.params.accountId;
    const month = req.params.month;
    const year = parseInt(req.params.year);

    try {
      const response = await this.service.execute(accountId, month, year);
      return res.status(200).send(response);
    } catch (err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}
