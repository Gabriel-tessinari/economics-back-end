import { LoginRequest } from "../../models/user/login-request";
import { ApiError } from "../../utils/api-error";
import TokenUtils from "../../utils/token-utils";
import { User } from "../../models/user/user";
import userRepository from "./user.repository";

class UserService {
  async findUserByEmail(email: string) {
    try {
      const user: User = await userRepository.findByEmail(email);

      return user;
    } catch(error: any) {
      console.log("🚀 ~ UserService ~ findUserByEmail ~ error:", error.message);
      throw error;
    }
  }

  async login(loginRequest: LoginRequest) {
    try {
      const user: User = await userRepository.findByEmail(loginRequest.email);

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