import { ApiError } from "../../../utils/api-error";
import { PdfGenerator } from "../../../utils/pdfGenerator/pdf-generator";
import { FindByAccountIdAndDateMonthYearUseCase } from "../../../useCases/transaction/findByAccountIdAndDateMonthYear/find-by-accountid-and-datemonthyear-usecase";

export class GenerateMonthReportService {
  constructor(
    private pdf: PdfGenerator,
    private findByAccountIdAndDateMonthYearUseCase: FindByAccountIdAndDateMonthYearUseCase
  ) {}

  async execute(accountId: string, month: string, year: number) {
    const transactions =
      await this.findByAccountIdAndDateMonthYearUseCase.execute(
        accountId,
        month,
        year
      );

    if (transactions.length > 0) {
      const account = transactions[0].account?.description;

      if (account) {
        let fileName =
          "./pdf/" + account.toLowerCase() + "-" + year + "-" + month + ".pdf";
        this.pdf.monthReport(fileName, account, month, year, transactions);
      } else {
        throw ApiError.businessLogicError("Transações sem conta vinculada.");
      }
    } else {
      throw ApiError.businessLogicError(
        "Não há transações para o período e conta selecionados."
      );
    }
  }
}
