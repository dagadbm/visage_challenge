const candidatesController = require('./controllers/candidates');
const fp = require('fastify-plugin');
const S = require('fluent-json-schema');

const getCandidateSchema = S.object()
  .additionalProperties(false)
  .prop('id', S.string())
  .prop('name', S.string())
  .prop('notes', S.string())
  .prop('jobTitle', S.string())
  .prop('document', S.string().contentEncoding('base64'));

const getAllCandidatesSchema = S.object()
  .additionalProperties(false)
  .prop('id', S.string())
  .prop('name', S.string())
  .prop('notes', S.string())
  .prop('jobTitle', S.string());


const addCandidateBodySchema = S.object()
  .additionalProperties(false)
  .prop('name', S.string()).required()
  .prop('notes', S.string()).required()
  .prop('jobTitle', S.string()).required()
  .prop('document', S.string().contentEncoding('base64')).required();

const updateCandidateBodySchema = S.object()
  .additionalProperties(false)
  .prop('name', S.string())
  .prop('notes', S.string())
  .prop('jobTitle', S.string())
  .prop('document', S.string().contentEncoding('base64'));

const routes = [
  {
    method: 'GET',
    url: '/api/v1/candidates',
    handler: candidatesController.getAllCandidates,
    // schema: {
    //   response: {
    //     '2xx': getCandidateSchema,
    //   },
    // },
  },
  {
    method: 'GET',
    url: '/api/v1/candidates/:id',
    handler: candidatesController.getCandidate,
    schema: {
      response: {
        '2xx': getCandidateSchema,
      },
    },
  },
  {
    method: 'POST',
    url: '/api/v1/candidates',
    handler: candidatesController.addCandidate,
    schema: {
      body: addCandidateBodySchema,
      response: {
        '2xx': getCandidateSchema,
      },
    },
  },
  {
    method: 'PUT',
    url: '/api/v1/candidates/:id',
    handler: candidatesController.updateCandidate,
    schema: {
      body: updateCandidateBodySchema,
      response: {
        '2xx': getCandidateSchema,
      },
    },
  },
];


module.exports = fp(async function (fastify, opts) {
  try {
    await Promise.all(routes.map((options) => fastify.route(options)));
  } catch (err) {
    console.error(err);
  }
});
