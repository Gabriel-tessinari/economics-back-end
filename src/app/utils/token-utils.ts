import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

class TokenUtils {
  generateToken(email: string): string {
    const secret = process.env.SECRET || '';
    return jwt.sign({ email }, secret, {
      expiresIn: '1d'
    });
  }

  verifyToken(req: Request, res: Response, next: any) {
    const token = req.headers.authorization;
    const secret = process.env.SECRET || '';

    if(!token) return res.status(401).json({ message: "Sem token." });

    jwt.verify(token.replace('Bearer ', ''), secret, function(error, decoded) {
      if(error) {
        console.log("🚀 ~ TokenUtils ~ jwt.verify ~ error:", error);
        return res.status(500).json({ message: "Falha na autenticação do token." });
      }

      const jwtPayload = decoded as JwtPayload;
      req.body.email = jwtPayload.email;

      next();
    });
  }
}
 export default new TokenUtils();