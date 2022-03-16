const { promises: fs } = require('fs');
const path = require('path');

/**
 * This is a webpack loader, used in MDX for loading example apps.
 * @returns
 * - source code of the component in text
 * - name of the imported file
 * - load function to load the component for rendering
 */

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
      name: ${JSON.stringify(path.basename(filename))},
      load: () => require('${this.utils.contextify(this.context, filename)}')
    };
  `
  return generated;
};
