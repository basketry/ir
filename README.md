[![main](https://github.com/basketry/ir/workflows/build/badge.svg?branch=main&event=push)](https://github.com/basketry/ir/actions?query=workflow%3Abuild+branch%3Amain+event%3Apush)
[![main](https://img.shields.io/npm/v/@basketry/ir)](https://www.npmjs.com/package/@basketry/ir)

# Basketry Intermediate Representation (IR)

This package defines the formal [Basketry](https://basketry.io) Intermediate Representation format.

View the human-readable documentation at [basketry.io/docs/specification/v0.2](https://basketry.io/docs/specification/v0.2).

## Overview

The Basketry Intermediate Representation (IR) is the shared data model that connects all Basketry components. Every Basketry pipeline passes data in this format, making the IR the single source of truth for how services, methods, types, etc are represented. The IR is defined in an authoritative JSON Schema and serves as the foundation for the entire Basketry ecosystem.

### Use the types

Types can be imported from package:

```ts
import { Service } from '@basketry/ir';

function doSomething(service: Service): void {
  // TODO: Do something with the service
}
```

### Validate IR

For tooling that produces IR (like a Parser), you can use the validate method to ensure your IR conforms to the schema:

```ts
import { validate } from '@basketry/ir';

const ir: any = {
  // TODO: Define a service object
};

// `service` will be a valid Service or `undefined`
// `errors` is an array of any errors
const { service, errors } = validate(ir);
```

### Import the schema

The raw JSON Schema is also included in the package:

```ts
import schema from '@basketry/ir/lib/schema.json';

// TODO: Do something with the schema
```

## Use Cases

### Documentation

The IR’s JSON Schema also serves as the source for the published specification at [basketry.io/docs/specification/v0.2](https://basketry.io/docs/specification/v0.2). This documentation is generated directly from the schema, ensuring it’s always in sync with the actual contract used by Basketry core and its components. Contributors updating the schema can automatically update the public-facing spec, making it a reliable reference for anyone building with or on top of Basketry.

### Parsers

Parsers are responsible for converting human-oriented service definition formats (like OpenAPI, JSON Schema, or other SDLs) into the Basketry IR. With the authoritative JSON Schema as a guide, parser authors can ensure their output matches the IR exactly, making it immediately compatible with any generator or rule in the ecosystem. This reduces the need for format-specific generators and encourages a healthy, shared tooling ecosystem.

### Rules

Rules act as automated reviewers, inspecting the IR to enforce architectural, style, or compliance guidelines. By working against the IR, rules can be applied universally, regardless of the original service definition format. This allows organizations to maintain high standards across diverse APIs and tech stacks, with validation that’s both consistent and easy to maintain.

### Generators

Generators take the IR as input and produce tangible outputs — code, documentation, SDKs, tests, or anything else that can be derived from a service definition. Because the IR is consistent and language-agnostic, generator authors can focus entirely on producing quality output without worrying about inconsistencies in the input.

## For contributors:

### Run this project

1.  Clone this repo
1.  Install packages: `npm ci`
1.  Generate types: `npx basketry`
1.  Build the code: `npm run build`

Note that the `lint` script is run prior to `build`. Auto-fixable linting or formatting errors may be fixed by running `npm run fix`.

### Create and run tests

1.  Add tests by creating files with the `.test.ts` suffix
1.  Run the tests: `npm t`
1.  Test coverage can be viewed at `/coverage/lcov-report/index.html`

### Publish a new package version

1. Create new version
   1. Navigate to the [version workflow](https://github.com/basketry/ir/actions/workflows/version.yml) from the Actions tab.
   1. Manually dispatch the action with the appropriate inputs
   1. This will create a PR with the new version
1. Publish to NPM
   1. Review and merge the PR
   1. The [publish workflow](https://github.com/basketry/ir/actions/workflows/publish.yml) will create a git tag and publish the package on NPM
