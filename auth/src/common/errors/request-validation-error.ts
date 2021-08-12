import { ValidationError } from "../types/types";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  public errors: ValidationError[];
  constructor(errors: ValidationError[]) {
    super("Req validation error");
    this.errors = errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
