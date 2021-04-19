export default class InvalidDataError extends Error {
  statusCode: number;

  constructor(messsage: string, statusCode: number = 400) {
    super(messsage);
    this.name = 'Invalid data error';
    this.statusCode = statusCode;
  }
}
