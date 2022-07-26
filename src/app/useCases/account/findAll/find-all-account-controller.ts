import { Request, Response } from "express";
import { FindAllAccountUseCase } from "./find-all-account-usecase";

export class FindAllAccountController {
  constructor(
    private usecase: FindAllAccountUseCase
  ) {}

  async execute(req: Request, res: Response) {
    try {
      const response = await this.usecase.execute();
      return res.status(200).send(response);
    } catch(err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}