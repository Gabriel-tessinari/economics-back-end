import { ApiError } from "../../../utils/api-error";
import { PdfGenerator } from "../../../utils/pdfGenerator/pdf-generator";
import { FindByAccountIdAndDateMonthYearUseCase } from "../../transaction/findByAccountIdAndDateMonth/find-by-accountid-and-datemonthyear-usecase";

export class GenerateMonthReportUseCase {
  constructor(
    private pdf: PdfGenerator,
    private findByAccountIdAndDateMonthYearUseCase: FindByAccountIdAndDateMonthYearUseCase
  ) {}

  async execute(accountId: string, month: string, year: number) {
    const transactions = await this.findByAccountIdAndDateMonthYearUseCase.execute(accountId, month, year);

    if(transactions.length > 0) {
      const account = transactions[0].account?.description;

      if(account) {
        let fileName = './pdf/' + account.toLowerCase() + month + '.pdf';
        this.pdf.monthReport(fileName, account, month, year, transactions);
      } else {
        throw new ApiError(422, "Transações sem conta vinculada.");
      }
    } else {
      throw new ApiError(422, "Não há transações para o período e conta selecionados.");
    }
  }
}