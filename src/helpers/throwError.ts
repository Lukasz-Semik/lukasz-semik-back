import { HttpException, HttpStatus } from '@nestjs/common';

export const throwError = (statusCode: HttpStatus, errors: any) => {
  throw new HttpException(
    {
      statusCode,
      errors,
    },
    statusCode
  );
};
