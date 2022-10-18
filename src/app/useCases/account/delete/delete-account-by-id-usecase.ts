import { IAccountRepo } from "../../../repositories/i-account-repo";
import { ApiError } from "../../../utils/api-error";

export class DeleteAccountByIdUseCase {
  constructor(
    private repo: IAccountRepo
  ) {}

  async execute(id: string) {
    if(id) {
      await this.repo.deleteById(id);
    } else {
      throw new ApiError(400, "Conta sem id para deletar.");
    }

    return;
  }
}