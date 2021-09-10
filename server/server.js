const fastify = require('fastify')();
const instance = require('./db/instance');

fastify.decorate('db', instance);

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, '0.0.0.0');
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
};

start()
