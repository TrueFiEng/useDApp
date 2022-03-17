# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.


### Adding examples

The examples are embedded components inside MDX files.
Every example consists of source code, and rendering of that source code.
Rendering requires some preprocessing, so the following workflow should be followed:

1. Create an example in `src/examples`. It should consist of:
    - either a default export of a single component,
    - or it should include a call to `ReactDOM.render()` rendering the example
2. In MDX, import the example using our custom loader

```tsx
import Example from '../example-loader.js!../src/examples/Example.tsx'
```

3. Render using ExampleContainer in MDX

Final version:

```tsx
import { ExampleContainer } from '../src/examples/ExampleContainer';
import Example from '../example-loader.js!../src/examples/Example.tsx'

<ExampleContainer example={Example}/>
```
