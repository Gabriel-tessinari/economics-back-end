import { Request, Response, Router } from "express";
import UserController from "../app/features/user/user.controller";
import tokenUtils from "../app/utils/token-utils";

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  return UserController.login(req.body, res);
});

export { router as userRouter };