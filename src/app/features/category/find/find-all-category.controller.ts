import { Request, Response } from "express";
import { FindAllCategoryService } from "./find-all-category.service";

export class FindAllCategoryController {
  constructor(
    private service: FindAllCategoryService
  ) {}

  async execute(req: Request, res: Response) {
    try {
      const response = await this.service.execute();
      return res.status(200).send(response);
    } catch(err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}