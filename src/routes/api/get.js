// src/routes/api/get.js

// Refactor to use response.js functions
// const logger = require('../../logger');
const { createSuccessResponse, createErrorResponse } = require('../../response');
const { Fragment } = require('../../model/fragment');

module.exports = async (req, res) => {
  try {
    // let frags = [];
    // frags = await Fragment.byUser(req.user, true);
    // res.status(200).json(createSuccessResponse({ frags }));
    // const data = { fragments: await Fragment.byUser(req.user, false) };

    const data = { fragments: await Fragment.byUser(req.user, req.query.expand) };
    const successResponse = createSuccessResponse(data);
    res.status(200).json(successResponse);
  } catch (error) {
    res.status(404).json(createErrorResponse("User's fragments not found"));
  }
};

// module.exports = (req, res) => {
//   // TODO: this is just a placeholder to get something working...
//   const data = { fragments: [] };
//   const successResponse = createSuccessResponse(data);
//   res.status(200).json(successResponse);

//   // res.status(200).json({
//   //   status: 'ok',
//   //   fragments: [],
//   // });
// };
