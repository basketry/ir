import Ajv, { DefinedError, ValidateFunction } from 'ajv';
import * as schema from './schema.json';
import {
  GenerateRequest,
  GenerateResponse,
  ParseRequest,
  ParseResponse,
  Service,
  ValidateRequest,
  ValidateResponse,
} from './generated/types';

const ajv = new Ajv({ allErrors: true, strict: false });

// Use a local key as the base for resolving $refs
const KEY = 'ir-schema';
ajv.addSchema(schema as object, KEY);

/** @deprecated use PluginError */
export type ParserError = {
  code: 'PARSER_ERROR';
  message: string;
  filepath?: string;
};

/** Represents an error that occurs during plugin execution */
export type PluginError = {
  code: 'PLUGIN_ERROR';
  message: string;
};

/** @deprecated use validateService */
export function validate(service: any) {
  const { obj, errors } = validateSchema(
    serviceRunner,
    service,
    'PARSER_ERROR',
  );
  return { service: obj, errors };
}

const serviceRunner = ajv.compile<Service>({
  $ref: `${KEY}#/definitions/service`,
});
export function validateService(service: unknown) {
  const { obj, errors } = validateSchema(serviceRunner, service);
  return { service: obj, errors };
}

const parseRequestRunner = ajv.compile<ParseRequest>({
  $ref: `${KEY}#/definitions/parseRequest`,
});
export function validateParserRequest(request: unknown) {
  const { obj, errors } = validateSchema(parseRequestRunner, request);
  return { request: obj, errors };
}

const parseResponseRunner = ajv.compile<ParseResponse>({
  $ref: `${KEY}#/definitions/parseResponse`,
});
export function validateParseResponse(response: unknown) {
  const { obj, errors } = validateSchema(parseResponseRunner, response);
  return { response: obj, errors };
}

const validateRequestRunner = ajv.compile<ValidateRequest>({
  $ref: `${KEY}#/definitions/validateRequest`,
});
export function validateValidateRequest(request: unknown) {
  const { obj, errors } = validateSchema(validateRequestRunner, request);
  return { request: obj, errors };
}

const validateResponseRunner = ajv.compile<ValidateResponse>({
  $ref: `${KEY}#/definitions/validateResponse`,
});
export function validateValidateResponse(response: unknown) {
  const { obj, errors } = validateSchema(validateResponseRunner, response);
  return { response: obj, errors };
}

const generateRequestRunner = ajv.compile<GenerateRequest>({
  $ref: `${KEY}#/definitions/generateRequest`,
});
export function validateGenerateRequest(request: unknown) {
  const { obj, errors } = validateSchema(generateRequestRunner, request);
  return { request: obj, errors };
}

const generateResponseRunner = ajv.compile<GenerateResponse>({
  $ref: `${KEY}#/definitions/generateResponse`,
});
export function validateGenerateResponse(response: unknown) {
  const { obj, errors } = validateSchema(generateResponseRunner, response);
  return { response: obj, errors };
}

type ErrorByCode = {
  PLUGIN_ERROR: PluginError;
  PARSER_ERROR: ParserError;
};

function validateSchema<T, C extends keyof ErrorByCode = 'PLUGIN_ERROR'>(
  runner: ValidateFunction<T>,
  obj: unknown,
  errorCode: C = 'PLUGIN_ERROR' as C,
): { obj: T | undefined; errors: ErrorByCode[C][] } {
  const errors: ErrorByCode[C][] = [];

  const isValid = runner(obj);

  if (!isValid) {
    for (const error of (runner.errors ?? []) as DefinedError[]) {
      const message = `Invalid schema: \`#${error.instancePath}\` ${error.message}`;

      errors.push({
        code: errorCode,
        message,
      } as ErrorByCode[C]);
    }
    return { obj: undefined, errors };
  }

  return { obj: obj as T, errors };
}
