import { PdfGenerator } from "../../../utils/pdfGenerator/pdf-generator";
import { FindAllTransactionCategoryUseCase } from "../../transactionCategory/findAll/find-all-transaction-category-usecase";

export class GenerateMonthReportUseCase {
  constructor(
    private pdf: PdfGenerator,
    private findAllTransactionCategoryUseCase: FindAllTransactionCategoryUseCase
  ) {}

  async execute(month: string, account: string) {
    let fileName = './pdf/' + account.toLowerCase() + month + '.pdf';
    const categories = await this.findAllTransactionCategoryUseCase.execute();
    this.pdf.monthReport(fileName);
  }
}