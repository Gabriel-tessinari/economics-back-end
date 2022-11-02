import { Request, Response } from "express";
import { GenerateMonthReportService } from "./generate-month-report.service";

export class GenerateMonthReportController {
  constructor(private service: GenerateMonthReportService) {}

  async execute(req: Request, res: Response) {
    const month = req.params.month;
    const account = req.params.accountId;
    const year = parseInt(req.params.year);

    try {
      await this.service.execute(account, month, year);
      return res.status(200).send("Relatório gerado com sucesso.");
    } catch (err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}
