import { Router } from "express";
import { generateMonthReportController } from "../app/useCases/report";

const reportRouter = Router();

reportRouter.post('/account/:accountId/month/:month', (req, res) => {
  return generateMonthReportController.execute(req, res);
});

export { reportRouter }