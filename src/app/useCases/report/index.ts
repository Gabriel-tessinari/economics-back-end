import { PdfGenerator } from "../../utils/pdfGenerator/pdf-generator";
import { findAllTransactionCategoryUseCase } from "../transactionCategory";
import { GenerateMonthReportController } from "./generateMonthReport/generate-month-report-controller";
import { GenerateMonthReportUseCase } from "./generateMonthReport/generate-month-report-usecase";

const pdf = new PdfGenerator;

const generateMonthReportUseCase = new GenerateMonthReportUseCase(pdf, findAllTransactionCategoryUseCase);
const generateMonthReportController = new GenerateMonthReportController(generateMonthReportUseCase);

export {
  generateMonthReportController, generateMonthReportUseCase
}