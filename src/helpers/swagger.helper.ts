import { applyDecorators } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

export function ApiSuccessResponse(schema: Function, isArray = false, status = 200) {
  return applyDecorators(
    ApiResponse({
      status,
      schema: isArray
        ? {
            type: 'array',
            items: { $ref: getSchemaPath(schema) },
          }
        : { $ref: getSchemaPath(schema) },
    }),
  );
}


export function ApiErrorResponse(status = 400, message = 'Bad Request') {
  return applyDecorators(
    ApiResponse({
      status,
      description: message,
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: status },
          message: { type: 'string', example: message },
        },
      },
    }),
  );
}