// src/routes/api/getid.js

// Refactor to use response.js functions
// const logger = require('../../logger');

// const { createSuccessResponse, createErrorResponse } = require('../../response');
// const { Fragment } = require('../../model/fragment');

// module.exports = async (req, res) => {
//   try {
//     const data = { fragments: await Fragment.byId(req.user, req.params.id) };
//     const successResponse = createSuccessResponse(data);
//     res.status(200).json(successResponse);
//   } catch (error) {
//     res.status(400).json(createErrorResponse('Fragment not found'));
//   }
// };

const { createErrorResponse } = require('../../response');
const { Fragment } = require('../../model/fragment');
var md = require('markdown-it')();
var path = require('path');

module.exports = async (req, res) => {
  try {
    if (path.extname(req.params.id) == '.html') {
      // console.log('--------------' + path.basename(req.params.id));
      // console.log('--------------' + path.extname(req.params.id));
      // console.log('--------------' + path.basename(req.params.id, path.extname(req.params.id)));
      try {
        const fragment = await Fragment.byId(
          req.user,
          path.basename(req.params.id, path.extname(req.params.id))
        );
        const data = await fragment.getData();
        var result = md.render(data.toString());
        res.status(200).setHeader('Content-Type', 'text/html').send(result);
      } catch (error) {
        res.status(415).json(createErrorResponse('Unsupported type or conversion'));
      }
    } else if (path.extname(req.params.id) == '') {
      const fragment = await Fragment.byId(req.user, req.params.id);
      const data = await fragment.getData();
      // data = data.toString();
      // console.log('---------------------------------' + typeof data);
      // console.log('_________________________________' + data);
      // const successResponse = createSuccessResponse(data);
      // res.send(data);
      res.status(200).setHeader('Content-Type', fragment.type).send(data);
    } else {
      res.status(415).json(createErrorResponse('Unsupported type'));
    }
  } catch (error) {
    res.status(404).json(createErrorResponse('Fragment not found'));
  }
};
