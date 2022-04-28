import * as fs from 'fs';

const filename = 'docs/03-API Reference/08-Hooks-generated.mdx'

const hooks = fs.readFileSync(filename, {encoding: 'utf-8'})

const map = {
  'Call': '/docs/API%20Reference/Models#call'
}

const replaced = hooks
  .replaceAll('{@link Call}', `[Call](${map['Call']})`)
  .replaceAll('{@link QueryParams', '`QueryParams`')
  .replaceAll('{@link ChainCall', '`ChainCall`')
  .replaceAll('{@link RawCall', '`RawCall`')

fs.writeFileSync(filename, replaced)
