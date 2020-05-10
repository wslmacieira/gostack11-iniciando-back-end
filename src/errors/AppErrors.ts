class AppError {
  public readonly message: string;

  public readonly stausCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.stausCode = statusCode;
  }
}

export default AppError;
