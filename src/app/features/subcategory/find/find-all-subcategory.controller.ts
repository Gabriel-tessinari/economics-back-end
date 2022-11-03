import { Request, Response } from "express";
import { FindAllSubcategoryService } from "./find-all-subcategory.service";

export class FindAllSubcategoryController {
  constructor(private service: FindAllSubcategoryService) {}

  async execute(req: Request, res: Response) {
    try {
      const response = await this.service.execute();
      return res.status(200).send(response);
    } catch (err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}
