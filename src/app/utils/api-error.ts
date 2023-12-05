export class ApiError extends Error {
  private status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static errorToAccessDB(): ApiError {   
    return new ApiError(500, 'Erro de acesso ao Banco de Dados.');
  }

  static businessLogicError(message: string): ApiError {
    return new ApiError(422, message);
  }

  static testError(): ApiError {
    return new ApiError(400, 'Falha no teste');
  }

  static unauthorized(): ApiError {
    return new ApiError(401, 'Não autorizado.');
  }
}