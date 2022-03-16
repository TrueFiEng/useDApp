const { promises: fs } = require('fs');
const path = require('path');

/**
 * @type {import('webpack').loader.Loader}
 */
module.exports = async function demoLoader() {
  const filename = this.resourcePath;
  this.addDependency(filename);

  const source = await fs.readFile(filename, { encoding: 'utf-8' });

  const generated = `
    export default {
      source: {
        ts: ${JSON.stringify(source)}
      },
      load: () => require('${this.utils.contextify(this.context, filename)}')
    };
  `
  
  console.log(generated);

  return generated;


  const files = await fs.readdir(path.dirname(this.resourcePath));
  const codeFiles = files.filter((fileName) => fileName.includes('.js') || fileName.includes('.tsx') || fileName.includes('.tsx'));
  let rawContent = {
    js: null,
    ts: null
  }
  let component = null;

  console.log({
    resourcePath: this.resourcePath,
    context: this.context,
  })


  let pageId = null;
  await Promise.all(codeFiles.map(async (fileName) => {
    const moduleID = fileName;
    const moduleFilepath = path.join(
      this.context,
      moduleID
    );
    this.addDependency(moduleFilepath);
    // TODO(wittjosiah): Load optional preview snippet as well.
    // TODO(wittjosiah): Load TS and automatically transpile for JS.
    if (moduleID.includes('.js')) {
      rawContent.js = await fs.readFile(moduleFilepath, { encoding: 'utf-8' });
    }
    if (moduleID.includes('.ts') || moduleID.includes('.tsx')) {
      rawContent.ts = await fs.readFile(moduleFilepath, { encoding: 'utf-8' });
      component = `() => {
        return require(${JSON.stringify("./" + moduleID)});
      }`;
      pageId = moduleID;
    }
  }));

  const transformed = `
  export const component = ${component};
  export const rawContent = ${JSON.stringify(rawContent, null, 2)};
  `;

  console.log(transformed)

  // WARNING: Make sure the returned code is compatible with our .browserslistrc.
  return transformed;
};
