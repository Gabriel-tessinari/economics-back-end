import { Account } from "../../../entities/account";
import { IAccountRepo } from "../../../repositories/i-account-repo";

export class CreateAccountUseCase {
  constructor(
    private repo: IAccountRepo
  ) {}

  async execute(req: Account) {
    await this.repo.create(req);
    return;
  }
}