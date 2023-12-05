import { User } from "../../models/user/user";
import userService from "../user/user.service";

class AuthService {
  async authenticateTokenByEmail(tokenEmail: string, email: string) {
    const user: User = await userService.findUserByEmail(email);

    if(!user) return false;

    return email == tokenEmail;
  }
}

export default new AuthService();