[![main](https://github.com/basketry/ir/workflows/build/badge.svg?branch=main&event=push)](https://github.com/basketry/ir/actions?query=workflow%3Abuild+branch%3Amain+event%3Apush)
[![master](https://img.shields.io/npm/v/@basketry/ir)](https://www.npmjs.com/package/@basketry/ir)

# Low-level Basketry IR components

This package provides a "raw IR" parser and generator for [Basketry](https://github.com/basketry/basketry)'s Intermediate Representation format. These tools are useful when debugging in-development components or when connecting a Basketry pipeline into another toolchain.

[A list of full-featured Basketry components can be found on the wiki.](https://github.com/basketry/basketry/wiki#components)

## Usage

Read existing IR into a pipeline:

```json
{
  "parser": "@basketry/ir/lib/parser",
  ...
}
```

Write IR as a file:

```json
{
  ...
  "generators": ["@basketry/ir/lib/generator"]
}
```

---

## For contributors:

### Run this project

1.  Install packages: `npm ci`
1.  Build the code: `npm run build`
1.  Run it! `npm start`

Note that the `lint` script is run prior to `build`. Auto-fixable linting or formatting errors may be fixed by running `npm run fix`.

### Create and run tests

1.  Add tests by creating files with the `.test.ts` suffix
1.  Run the tests: `npm t`
1.  Test coverage can be viewed at `/coverage/lcov-report/index.html`

### Publish a new package version

1. Ensure latest code is published on the `main` branch.
1. Create the new version number with `npm version {major|minor|patch}`
1. Push the branch and the version tag: `git push origin main --follow-tags`

The [publish workflow](https://github.com/basketry/ir/actions/workflows/publish.yml) will build and pack the new version then push the package to NPM. Note that publishing requires write access to the `main` branch.

---

Generated with [generator-ts-console](https://www.npmjs.com/package/generator-ts-console)
