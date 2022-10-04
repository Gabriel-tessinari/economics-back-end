import { PrismaClient } from "@prisma/client";
import { Account } from "../../entities/account";
import { ApiError } from "../../utils/api-error";
import { IAccountRepo } from "../i-account-repo";
import { PrismaToEntity } from "./mappers/prismaToEntity";

const prisma = new PrismaClient;

export class PrismaAccountRepo implements IAccountRepo {
  async create(account: Account): Promise<void> {
    try {
      await prisma.account.create({
        data: {
          id: account.id,
          description: account.description,
          total: account.total
        }
      });
    } catch(err: any) {
      console.log(err);
      throw new ApiError(500, "Erro de acesso ao Banco de Dados.");
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await prisma.account.delete({
        where: {
          id: id
        }
      });
    } catch(err: any) {
      console.log(err);
      throw new ApiError(500, "Erro de acesso ao Banco de Dados.");
    }
  }

  async findAll(): Promise<Account[]> {
    let accounts: Account[] = [];

    try {
      const response = await prisma.account.findMany({
        orderBy: { description: "asc" }
      });

      if(response) {
        response.forEach(account => {
          accounts.push(PrismaToEntity.account(account));
        });
      }

      return accounts;
    } catch(err: any) {
      console.log(err);
      throw new ApiError(500, "Erro de acesso ao Banco de Dados.");
    }
  }
}
