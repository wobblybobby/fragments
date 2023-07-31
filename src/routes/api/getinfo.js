// src/routes/api/getinfo.js

// Refactor to use response.js functions
// const logger = require('../../logger');

const { createSuccessResponse, createErrorResponse } = require('../../response');
const { Fragment } = require('../../model/fragment');

module.exports = async (req, res) => {
  try {
    const data = { fragments: await Fragment.byId(req.user, req.params.id) };
    const successResponse = createSuccessResponse(data);
    res.status(200).json(successResponse);
  } catch (error) {
    res.status(400).json(createErrorResponse('Fragment not found'));
  }
};
