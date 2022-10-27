import { Request, Response } from "express";
import { FindAllAccountService } from "./find-all-account.service";

export class FindAllAccountController {
  constructor(private service: FindAllAccountService) {}

  async execute(req: Request, res: Response) {
    try {
      const response = await this.service.execute();
      return res.status(200).send(response);
    } catch (err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}
