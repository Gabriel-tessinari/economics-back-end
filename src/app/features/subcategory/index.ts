import { PrismaSubcategoryRepo } from "../../repositories/implementations/prisma/prisma-subcategory-repo";
import { findTransactionBySubcategoryIdService } from "../transaction";
import { CreateSubcategoryController } from "./create/create-subcategory.controller";
import { CreateSubcategoryService } from "./create/create-subcategory.service";
import { DeleteSubcategoryByIdController } from "./delete/delete-subcategory-by-id.controller";
import { DeleteSubcategoryByIdService } from "./delete/delete-subcategory-by-id.service";
import { FindAllSubcategoryController } from "./find/find-all-subcategory.controller";
import { FindAllSubcategoryService } from "./find/find-all-subcategory.service";

const repo = new PrismaSubcategoryRepo();

const createSubcategoryService = new CreateSubcategoryService(repo);
const createSubcategoryController = new CreateSubcategoryController(
  createSubcategoryService
);

const deleteSubcategoryByIdService = new DeleteSubcategoryByIdService(
  repo,
  findTransactionBySubcategoryIdService
);
const deleteSubcategoryByIdController = new DeleteSubcategoryByIdController(
  deleteSubcategoryByIdService
);

const findAllSubcategoryService = new FindAllSubcategoryService(repo);
const findAllSubcategoryController = new FindAllSubcategoryController(
  findAllSubcategoryService
);

export {
  createSubcategoryController,
  createSubcategoryService,
  deleteSubcategoryByIdController,
  deleteSubcategoryByIdService,
  findAllSubcategoryController,
  findAllSubcategoryService,
};
