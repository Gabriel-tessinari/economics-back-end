import jwt from "jsonwebtoken";
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
    console.log("🚀 ~ TokenUtils ~ verifyToken ~ secret:", secret);

    if(!token) return res.status(401).json({ message: "Sem token." });

    jwt.verify(token, secret, function(error, decoded) {
      
      console.log("🚀 ~ TokenUtils ~ jwt.verify ~ error:", error);
      if(error) return res.status(500).json({ message: "Falha na autenticação do token." });

      next();
    });
  }
}
 export default new TokenUtils();