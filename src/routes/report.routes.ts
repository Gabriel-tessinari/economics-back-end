import { Router } from "express";
import { generateMonthReportController } from "../app/features/report";

const reportRouter = Router();

reportRouter.post("/account/:accountId/month/:month/year/:year", (req, res) => {
  return generateMonthReportController.execute(req, res);
});

export { reportRouter };
