import * as fs from 'fs';

const filename = 'docs/03-API Reference/08-Hooks-generated.mdx'

const hooks = fs.readFileSync(filename, {encoding: 'utf-8'})

const map = {
  'Call': '/docs/API%20Reference/Models#call'
}

const replaced = hooks
  .replaceAll('{@link Call}', `<a href="${map['Call']}">Call</a>`)
  .replaceAll('{@link QueryParams}', '<code>QueryParams</code>')
  .replaceAll('{@link ChainCall}', '`ChainCall`')
  .replaceAll('{@link RawCall}', '`RawCall`')
  .replaceAll('{@link CallResult}', '`CallResult`')
  .replaceAll('{@link useCall}', '`useCall`')

fs.writeFileSync(filename, replaced)
