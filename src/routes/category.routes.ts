import { Router } from "express";
import { 
  createCategoryController, 
  deleteCategoryByIdController, 
  findAllCategoryController
} from "../app/features/category";

const categoryRouter = Router();

categoryRouter.post('/', (req, res) => {
  return createCategoryController.execute(req, res);
});

categoryRouter.delete('/:id', (req, res) => {
  return deleteCategoryByIdController.execute(req, res);
});

categoryRouter.get('/', (req, res) => {
  return findAllCategoryController.execute(req, res);
});

export { categoryRouter }