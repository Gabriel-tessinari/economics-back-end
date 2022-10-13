import { PdfGenerator } from "../../utils/pdfGenerator/pdf-generator";
import { findByAccountIdAndDateMonthYearUseCase } from "../transaction";
import { GenerateMonthReportController } from "./generateMonthReport/generate-month-report-controller";
import { GenerateMonthReportUseCase } from "./generateMonthReport/generate-month-report-usecase";

const pdf = new PdfGenerator;

const generateMonthReportUseCase = new GenerateMonthReportUseCase(pdf, findByAccountIdAndDateMonthYearUseCase);
const generateMonthReportController = new GenerateMonthReportController(generateMonthReportUseCase);

export {
  generateMonthReportController, generateMonthReportUseCase
}