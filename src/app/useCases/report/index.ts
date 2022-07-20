import { PdfGenerator } from "../../utils/pdfGenerator/pdf-generator";
import { findByAccountIdAndDateMonthUseCase } from "../transaction";
import { GenerateMonthReportController } from "./generateMonthReport/generate-month-report-controller";
import { GenerateMonthReportUseCase } from "./generateMonthReport/generate-month-report-usecase";

const pdf = new PdfGenerator;

const generateMonthReportUseCase = new GenerateMonthReportUseCase(pdf, findByAccountIdAndDateMonthUseCase);
const generateMonthReportController = new GenerateMonthReportController(generateMonthReportUseCase);

export {
  generateMonthReportController, generateMonthReportUseCase
}