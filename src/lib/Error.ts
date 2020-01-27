export class HttpError extends Error {
  status?: number;

  constructor(message: string, status = 404) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
    this.status = status;
  }
}
