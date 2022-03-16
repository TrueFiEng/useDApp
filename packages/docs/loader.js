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

};
