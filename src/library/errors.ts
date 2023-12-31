import { z as zod } from 'zod';
import { MutationResponse } from '../codegen/graphql';
import { Prisma } from '@prisma/client';

/**
 * Handles a validation error and returns a MutationResponse object.
 * @param error - The ZodError object representing the validation error.
 * @returns The MutationResponse object containing list of errors, and success status which is false.
 */
function handleValidationError(error: zod.ZodError): MutationResponse {
  const response: MutationResponse = {
    errors: [],
    success: false,
  };
  for (const issue of error.issues) {
    response.errors.push({
      code: 'BAD_INPUT',
      message: issue.message,
      extension: {
        __typename: 'BadInputErrorExtension',
        path: issue.path.map((path) => path.toString()),
      },
    });
  }
  return response;
}

/**
 * Handles a Prisma errors.
 * @param error - The Prisma error to handle.
 * @returns The MutationResponse object containing list of errors, and success status which is false
 */
function handlePrismaError(error: Prisma.PrismaClientKnownRequestError): MutationResponse {
  switch (true) {
    case error.code.startsWith('P10'):
      return {
        errors: [
          {
            code: 'DB_ERROR',
            message: 'خطا در برقراری ارتباط با پایگاه داده',
          },
        ],
        success: false,
      };
    case error.code.startsWith('P20'):
      // if you reached here it only means one thing, you fucked up brother,
      // jokes aside there is something that you didn't catch during validation phase,
      // for example unique constraints or foreign key stuff, or used findOrThrow somewhere in the way
      // what you where sure wont cause error but it did, just trace back the error and i will sure you'l find it's cause
      return {
        errors: [
          {
            code: 'DB_ERROR',
            message: 'خطا هنگام کار با پایگاه داده',
          },
        ],
        success: false,
      };
    default:
      return {
        errors: [
          {
            code: 'DB_ERROR',
            message: 'خطایی در ارتباط با پایگاه داده رخ داده است',
          },
        ],
        success: false,
      };
  }
}

/**
 * Handles unknown errors and returns a MutationResponse object.
 * @returns {MutationResponse} The response object containing the errors and success status.
 */
function handleUnknownError(): MutationResponse {
  const response: MutationResponse = {
    errors: [],
    success: false,
  };
  response.errors.push({
    code: 'UNKNOWN_ERROR',
    message: 'خطایی رخ داده است',
  });
  return response;
}

/**
 * Handles the given error and returns a MutationResponse.
 * If the error is an instance of zod.ZodError, it calls handleValidationError.
 * Otherwise, it calls handleUnknownError.
 *
 * @param error - The error to handle.
 * @returns The MutationResponse based on the error.
 */
export function handle(error: unknown): MutationResponse {
  switch (true) {
    case error instanceof zod.ZodError:
      return handleValidationError(error);
    case error instanceof Prisma.PrismaClientKnownRequestError:
      return handlePrismaError(error);
    default:
      return handleUnknownError();
  }
}

export default {
  handle,
  handleValidationError,
  handlePrismaError,
  handleUnknownError,
};
