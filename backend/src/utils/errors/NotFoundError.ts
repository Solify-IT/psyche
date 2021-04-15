export default class NotFoundError extends Error {
  statusCode: number;

  constructor(messsage: string, statusCode: number = 404) {
    super(messsage);
    this.name = 'Not found error';
    this.statusCode = statusCode;
  }
}
