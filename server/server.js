const fastify = require('fastify')();
const instance = require('./db/instance');
const routes = require('./routes');

fastify.decorate('db', instance);
fastify.register(routes);

fastify.get("/", async () => {
  return {
    Message: "Fastify is On Fire"
  }
})

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
};

start()
