import { Request, Response, Router } from "express";
import authController from "../app/features/auth/auth.controller";
import tokenUtils from "../app/utils/token-utils";

const router = Router();

router.get('/email/:email', tokenUtils.verifyToken, (req: Request, res: Response) => {
  return authController.authenticateTokenByEmail(req, res);
});

export { router as authRouter };