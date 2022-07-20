import { ApiError } from "../../../utils/api-error";
import { PdfGenerator } from "../../../utils/pdfGenerator/pdf-generator";
import { FindByAccountIdAndDateMonthUseCase } from "../../transaction/findByAccountIdAndDateMonth/find-by-accountid-and-datemonth-usecase";

export class GenerateMonthReportUseCase {
  constructor(
    private pdf: PdfGenerator,
    private findByAccountIdAndDateMonthUseCase: FindByAccountIdAndDateMonthUseCase
  ) {}

  async execute(accountId: string, month: string) {
    const transactions = await this.findByAccountIdAndDateMonthUseCase.execute(accountId, month);

    if(transactions.length > 0) {
      const account = transactions[0].account?.description;

      if(account) {
        let fileName = './pdf/' + account.toLowerCase() + month + '.pdf';
        this.pdf.monthReport(fileName, account, month, transactions);
      } else {
        throw new ApiError(422, "Transações sem conta vinculada.");
      }
    } else {
      throw new ApiError(422, "Não há transações para o período e conta selecionados.");
    }
  }
}