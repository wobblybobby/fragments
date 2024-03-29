// src/routes/index.js

const express = require('express');

// version and author from package.json
const { version, author } = require('../../package.json');

// Create a router that we can use to mount our API
const router = express.Router();

const { Fragment } = require('../model/fragment');
const contentType = require('content-type');

// Get hostname
const { hostname } = require('os');

// Refactor to use response.js functions
// const { createSuccessResponse } = require('../response');
// const data = { author, githubUrl: 'https://github.com/ashiun/fragments', version };
// const successResponse = createSuccessResponse(data);
const successResponse = require('../response').createSuccessResponse({
  author,
  githubUrl: 'https://github.com/ashiun/fragments',
  version,
  hostname: hostname(),
});

// Our authentication middleware
const { authenticate } = require('../authentication');

/**
 * Expose all of our API routes on /v1/* to include an API version.
 * Protect them all so you have to be authenticated in order to access.
 */
router.use(`/v1`, authenticate(), require('./api'));

/**
 * Define a simple health check route. If the server is running
 * we'll respond with a 200 OK.  If not, the server isn't healthy.
 */
router.get('/', (req, res) => {
  // Client's shouldn't cache this response (always request it fresh)
  res.setHeader('Cache-Control', 'no-cache');
  // Send a 200 'OK' response
  res.status(200).json(successResponse);
  // res.status(200).json({
  //   status: 'ok',
  //   author,
  //   // Use your own GitHub URL for this...
  //   githubUrl: 'https://github.com/ashiun/fragments',
  //   version,
  // });
});

// Support sending various Content-Types on the body up to 5M in size
const rawBody = () =>
  express.raw({
    inflate: true,
    limit: '5mb',
    type: (req) => {
      // See if we can parse this content type. If we can, `req.body` will be
      // a Buffer (e.g., `Buffer.isBuffer(req.body) === true`). If not, `req.body`
      // will be equal to an empty Object `{}` and `Buffer.isBuffer(req.body) === false`
      const { type } = contentType.parse(req);
      return Fragment.isSupportedType(type);
    },
  });

// Use a raw body parser for POST, which will give a `Buffer` Object or `{}` at `req.body`
// You can use Buffer.isBuffer(req.body) to test if it was parsed by the raw body parser.
router.post('/v1/fragments', rawBody(), require('./api/post'));

router.put('/v1/fragments/:id', rawBody(), require('./api/put'));

module.exports = router;
