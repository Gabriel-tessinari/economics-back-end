import { Request, Response } from "express";
import { Subcategory } from "../../../entities/subcategory";
import { CreateSubcategoryService } from "./create-subcategory.service";

export class CreateSubcategoryController {
  constructor(private service: CreateSubcategoryService) {}

  async execute(req: Request, res: Response) {
    const subcategory = new Subcategory(req.body);

    try {
      await this.service.execute(subcategory);
      return res.status(201).send("Subcategoria adicionada com sucesso.");
    } catch (err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}
