import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'

const server: FastifyInstance = Fastify({})

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}

server.get('/ping', opts, async (request, reply) => {
  return { pong: 'it worked!' }
})

export { server }

export const start = async (port: number | string) => {
  try {
    await server.listen(port)
    console.log(`Server listening on port ${port}.`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
  return server
}
