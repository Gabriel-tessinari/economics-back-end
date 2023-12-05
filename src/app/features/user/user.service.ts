import pool from "../../../config/postgresql";
import { LoginRequest } from "../../models/user/login-request";
import { ApiError } from "../../utils/api-error";
import TokenUtils from "../../utils/token-utils";
import { User } from "../../models/user/user";

class UserService {
  async login(loginRequest: LoginRequest) {
    console.log("🚀 ~ UserService ~ login ~ loginRequest:", loginRequest);
    try {
      const user: User = (await pool.query(`select * from users where email = '${loginRequest.email}'`)).rows[0];

      if(!user || user.password != loginRequest.password) {
        throw new ApiError(401, "Email e/ou senha incorretos.");
      }
      
      return TokenUtils.generateToken(user.email);
    } catch(error: any) {
      console.log("🚀 ~ UserService ~ login ~ error:", error.message);
      throw error;
    }
  }
}

export default new UserService();