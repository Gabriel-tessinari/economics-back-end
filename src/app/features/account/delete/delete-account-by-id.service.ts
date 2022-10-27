import { IAccountRepo } from "../../../repositories/i-account-repo";

export class DeleteAccountByIdService {
  constructor(private repo: IAccountRepo) {}

  async execute(id: string) {
    if (await this.repo.findById(id)) {
      await this.repo.deleteById(id);
    }

    return;
  }
}
