import { Request, Response } from "express";
import authService from "./auth.service";

class AuthController {
  async authenticateTokenByEmail(req: Request, res: Response) {
    const tokenEmail = req.body.email;
    const email = req.params.email;

    if(!tokenEmail) {
      return res.status(200).json(false);
    }

    try {
      return res.status(200).json(await authService.authenticateTokenByEmail(tokenEmail, email));
    } catch(error: any) {
      return res.status(error.status).json({ message: error.message });
    }
  }
}

export default new AuthController();