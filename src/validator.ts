import Ajv from 'ajv';
import * as schema from './schema.json';
import { Service } from './generated/types';

const ajv = new Ajv({ allErrors: true, strict: false });
const runner = ajv.compile(schema);

export type ParserError = {
  code: 'PARSER_ERROR';
  message: string;
  filepath?: string;
};

export function validate(service: any): {
  service: Service | undefined;
  errors: ParserError[];
} {
  const errors: ParserError[] = [];

  const isValid = runner(service);

  if (!isValid) {
    for (const error of runner.errors ?? []) {
      const message = `Invalid IR: \`#${error.instancePath}\` ${error.message}`;

      errors.push({
        code: 'PARSER_ERROR',
        message,
      });
    }
    return { service: undefined, errors };
  }

  return { service: service as Service, errors };
}
