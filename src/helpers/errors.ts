import { z as zod } from 'zod';
import { MutationResponse } from '../codegen/graphql';

/**
 * Handles a validation error and returns a MutationResponse object.
 * @param error - The ZodError object representing the validation error.
 * @returns The MutationResponse object containing list of errors, and success status which is false.
 */
export function handleValidationError(error: zod.ZodError): MutationResponse {
  const response: MutationResponse = {
    errors: [],
    success: false,
  };
  for (const issue of error.issues) {
    response.errors.push({
      code: 'BAD_INPUT',
      message: issue.message,
      extension: {
        field: issue.path,
      },
    });
  }
  return response;
}

/**
 * Handles unknown errors and returns a MutationResponse object.
 * @returns {MutationResponse} The response object containing the errors and success status.
 */
export function handleUnknownError(): MutationResponse {
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
export function handleError(error: unknown): MutationResponse {
  if (error instanceof zod.ZodError) {
    return handleValidationError(error);
  } else {
    return handleUnknownError();
  }
}
