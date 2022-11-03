import { Router } from "express";
import {
  createSubcategoryController,
  deleteSubcategoryByIdController,
  findAllSubcategoryController,
} from "../app/features/subcategory";

const subcategoryRouter = Router();

subcategoryRouter.post("/", (req, res) => {
  return createSubcategoryController.execute(req, res);
});

subcategoryRouter.delete("/:id", (req, res) => {
  return deleteSubcategoryByIdController.execute(req, res);
});

subcategoryRouter.get("/", (req, res) => {
  return findAllSubcategoryController.execute(req, res);
});

export { subcategoryRouter };
