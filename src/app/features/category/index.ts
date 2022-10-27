import { PrismaCategoryRepo } from "../../repositories/implementations/prisma/prisma-category-repo";
import { CreateCategoryController } from "./create/create-category.controller";
import { CreateCategoryService } from "./create/create-category.service";
import { DeleteCategoryByIdController } from "./delete/delete-category-by-id.controller";
import { DeleteCategoryByIdService } from "./delete/delete-category-by-id.service";
import { FindAllCategoryController } from "./find/find-all-category.controller";
import { FindAllCategoryService } from "./find/find-all-category.service";

const repo = new PrismaCategoryRepo();

const createCategoryService = new CreateCategoryService(repo);
const createCategoryController = new CreateCategoryController(
  createCategoryService
);

const deleteCategoryByIdService = new DeleteCategoryByIdService(repo);
const deleteCategoryByIdController = new DeleteCategoryByIdController(
  deleteCategoryByIdService
);

const findAllCategoryService = new FindAllCategoryService(repo);
const findAllCategoryController = new FindAllCategoryController(
  findAllCategoryService
);

export {
  createCategoryController,
  createCategoryService,
  deleteCategoryByIdController,
  deleteCategoryByIdService,
  findAllCategoryController,
  findAllCategoryService,
};
