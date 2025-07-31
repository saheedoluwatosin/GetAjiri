import { GraphQLError } from "graphql";
import { ErrorCode, ErrorMessage } from "./error-codes";



export class KnownError extends Error {
  private updatedMessage: string;
  constructor(public readonly code: keyof typeof ErrorCode, message?: string) {
    super(message || ErrorMessage[code]);
    this.updatedMessage = message || ErrorMessage[code];
    this.throwGraphqLError();
  }

  throwGraphqLError() {
    throw new GraphQLError(this.updatedMessage, {
      extensions: { code: this.code }
    });
  }

  static ifNotFound<T>(data: T , message?: string , errorCode: keyof typeof ErrorCode = ErrorCode.RESOURCE_NOT_FOUND) {
   if (
      !data ||
      (Array.isArray(data) && !data.length) ||
      Object.keys(data).length === 0
    ) {
      throw new KnownError(errorCode, message);
    }
  }

  static ifFound<T>(data: T , message?: string , errorCode: keyof typeof ErrorCode = ErrorCode.DUPLICATE) {
    if (data) {
      throw new KnownError(errorCode, message);
    }
  }

   static dbError(fieldName: string, errorCode: number, message?: string) {
    switch (errorCode) {
      case 11000:
        throw new KnownError(
          ErrorCode.DUPLICATE,
          message || `${fieldName} is already taken`,
        );
      default:
        throw new KnownError(ErrorCode.INTERNAL_ERROR, message);
    }
  }
}