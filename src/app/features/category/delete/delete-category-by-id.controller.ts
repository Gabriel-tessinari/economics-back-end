import { Request, Response } from "express";
import { DeleteCategoryByIdService } from "./delete-category-by-id.service";

export class DeleteCategoryByIdController {
  constructor(private service: DeleteCategoryByIdService) {}

  async execute(req: Request, res: Response) {
    const id = req.params.id;

    try {
      await this.service.execute(id);
      return res.status(200).send("Categoria excluída com sucesso.");
    } catch (err: any) {
      return res.status(err.status).send(err.message);
    }
  }
}
