import { Account } from "../../../entities/account";
import { IAccountRepo } from "../../../repositories/i-account-repo";

export class FindAllAccountUseCase {
  constructor(
    private repo: IAccountRepo
  ) {}

  async execute(): Promise<Account[]> {
    let response = await this.repo.findAll();
    return response;
  }
}