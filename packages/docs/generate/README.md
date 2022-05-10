# Auto generating docs

Part of the documentation is auto-generated from code.

The process is executed by running:

```bash
pnpm run generate
```

in the `packages/docs` directory.

## Generation process

The process of auto-generation can be described in the following steps:

1. Running [typedoc](https://typedoc.org/)

We take TS files from `@usedapp/core`, and automatically generate project reflection from code and documentation in jsdoc.

2. Generate content

The `generate-content.ts` script generates a markdown representation of the project reflection - a list of hooks with description, examples, etc.

3. Replacing `{@link xxx}` references

We can conveniently use `{@link xxx}` type of links in jsdoc documentation, which are automatically working in IDEs thanks to the build-in TS engines understanding the TS syntax.

This will however not work in the browser - so we replace those links with proper HTML links to the place where the given entity is documented.

## Auto-generated content

Currently, only the hooks docs are auto-generated.
