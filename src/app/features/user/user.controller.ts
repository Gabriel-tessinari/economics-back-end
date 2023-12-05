import { Response } from "express";
import { LoginRequest } from "../../models/user/login-request";
import userService from "./user.service";

class UserController {
  async login(loginRequest: LoginRequest, res: Response) {
    try {
      return res.status(200).json(await userService.login(loginRequest));
    } catch(error: any) {
      console.log("🚀 ~ UserController ~ login ~ error:", error);
      return res.status(error.status).json(error.message);
    }
  }
}

export default new UserController();