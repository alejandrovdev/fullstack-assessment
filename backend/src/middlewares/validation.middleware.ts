import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';

export function validationMiddleware<T extends object>(type: new () => T) {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req.body);

    validate(dto).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const messages = errors
          .map((error) => Object.values(error.constraints || {}))
          .flat();

        res.status(400).json({ errors: messages });
      } else {
        req.body = dto;
        next();
      }
    });
  };
}
