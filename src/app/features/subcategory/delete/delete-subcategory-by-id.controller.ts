import { Request, Response } from "express";
import { DeleteSubcategoryByIdService } from "./delete-subcategory-by-id.service";

export class DeleteSubcategoryByIdController {
  constructor(private service: DeleteSubcategoryByIdService) {}

  async execute(req: Request, res: Response) {
    const id = req.params.id;

    try {
      await this.service.execute(id);
      return res.status(200).send("Subcategoria excluída com sucesso.");
    } catch (err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}
