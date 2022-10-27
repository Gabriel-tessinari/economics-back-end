import { ApiError } from "../../../utils/api-error";
import { PdfGenerator } from "../../../utils/pdfGenerator/pdf-generator";
import { FindTransactionByAccountIdMonthYearService } from "../../transaction/find/find-transaction-by-accountid-month-year.service";

export class GenerateMonthReportService {
  constructor(
    private pdf: PdfGenerator,
    private findTransactionByAccountIdMonthYearService: FindTransactionByAccountIdMonthYearService
  ) {}

  async execute(accountId: string, month: string, year: number) {
    const transactions =
      await this.findTransactionByAccountIdMonthYearService.execute(
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
