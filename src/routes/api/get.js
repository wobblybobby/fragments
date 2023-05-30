// src/routes/api/get.js

// Refactor to use response.js functions
const { createSuccessResponse } = require('../../response');

/**
 * Get a list of fragments for the current user
 */
module.exports = (req, res) => {
  // TODO: this is just a placeholder to get something working...
  const data = { fragments: [] };
  const successResponse = createSuccessResponse(data);
  res.status(200).json(successResponse);

  // res.status(200).json({
  //   status: 'ok',
  //   fragments: [],
  // });
};
