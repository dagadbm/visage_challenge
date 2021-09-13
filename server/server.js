const fastify = require('fastify');
const instance = require('./db/instance');
const routes = require('./routes');

const server = fastify({
  // 10 MB limit for the base64 pdfs (horrible solution)
  // this should be in S3 with ids and the ids on the candidates table
  bodyLimit: 10485760,
});
server.decorate('db', instance);

server.register(routes);
server.register(require('fastify-cors'), {
  origin: (origin, cb) => {
    cb(null, true);
    return;
  }
})

server.get("/", async () => {
  return {
    Message: "Fastify is On Fire"
  }
})

const start = async () => {
  try {
    await server.listen(process.env.PORT || 4000, '0.0.0.0');
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
};

start()
