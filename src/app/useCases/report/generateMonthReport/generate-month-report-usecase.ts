import { PdfGenerator } from "../../../utils/pdfGenerator/pdf-generator";
import { FindAllTransactionCategoryUseCase } from "../../transactionCategory/findAll/find-all-transaction-category-usecase";

export class GenerateMonthReportUseCase {
  constructor(
    private pdf: PdfGenerator,
    private findAllTransactionCategoryUseCase: FindAllTransactionCategoryUseCase
  ) {}

  async execute(month: string, account: string) {
    const transactions = await this.findAllTransactionCategoryUseCase.execute();
    let fileName = './pdf/' + account.toLowerCase() + month + '.pdf';
    this.pdf.monthReport(fileName);
  }
}