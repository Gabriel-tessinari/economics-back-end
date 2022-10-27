import { PdfGenerator } from "../../utils/pdfGenerator/pdf-generator";
import { findTransactionByAccountIdMonthYearService } from "../transaction";
import { GenerateMonthReportController } from "./generate/generate-month-report.controller";
import { GenerateMonthReportService } from "./generate/generate-month-report.service";

const pdf = new PdfGenerator();

const generateMonthReportService = new GenerateMonthReportService(
  pdf,
  findTransactionByAccountIdMonthYearService
);
const generateMonthReportController = new GenerateMonthReportController(
  generateMonthReportService
);

export { generateMonthReportController, generateMonthReportService };
