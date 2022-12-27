/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
export const throwException = (error: string, exception: HttpStatus) => {
  throw new HttpException(
    {
      status: exception,
      error,
    },
    exception,
  );
};
