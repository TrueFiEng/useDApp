# Auto generating docs

Part of the documentation is auto-generated from code.

The process is executed by running:

```bash
pnpm run generate
```

in the `packages/docs` directory.

## Generation process

The process of auto-generation can be described in the following steps:

1. Running [jsdoc2md](https://github.com/jsdoc2md)

We take TS files from `@usedapp/core`, and automatically generate markdown output from code and documentation in jsdoc.

2. Replacing `{@link xxx}` references

We can conveniently use `{@link xxx}` type of links in jsdoc documentation, which are automatically working in IDEs thanks to the build-in TS engines understanding the TS syntax.

This will however not work in the browser - so we replace those links with proper HTML links to the place where the given entity is documented.

3. Replacing other content not properly rendered by MDX engine.

`jsdoc2md` outputs a mix of markdown and HTML (which is also a proper content of a markdown file).

The output is picked up by docusaurus, and by a MDX engine under the hood.

There are some problems with this workflow, that cannot be foreseen when writing the jsdoc comments:

- A markdown statement in HTML part of the document not properly rendered.
- A HTML statement wrongly interpreted as JSX

The `replace-content` script tries to alleviate those problems. 

## Auto-generated content

Currently, only the hooks docs are auto-generated.
