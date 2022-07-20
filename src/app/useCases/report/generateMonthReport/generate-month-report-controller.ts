import { Request, Response } from "express";
import { GenerateMonthReportUseCase } from "./generate-month-report-usecase";

export class GenerateMonthReportController {
  constructor(
    private usecase: GenerateMonthReportUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const month = req.params.month;
    const account = req.params.accountId;

    try {
      await this.usecase.execute(month, account);
      return res.status(200).send("Relatório gerado com sucesso.");
    } catch(err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}