export class ApiError extends Error {
  private status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static DBAccessError() {
    return new ApiError(500, "Erro de acesso ao Banco de Dados.");
  }
}