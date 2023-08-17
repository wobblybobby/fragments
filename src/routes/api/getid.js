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

// console.log('--------------' + path.basename(req.params.id));
// console.log('--------------' + path.extname(req.params.id));
// console.log('--------------' + path.basename(req.params.id, path.extname(req.params.id)));
// data = data.toString();
// console.log('---------------------------------' + typeof data);
// console.log('_________________________________' + data);
// const successResponse = createSuccessResponse(data);
// res.send(data);

// let fragment;
// let data;
// try {
//   fragment = new Fragment(await Fragment.byId(req.user, req.params.id));
//   data = await fragment.getData();
// } catch (error) {
// return res.status(404).json(createErrorResponse('Fragment not found'));
// }
// res.setHeader('Content-Type', fragment.type);
// res.setHeader('Content-Length', fragment.size);
// return res.status(200).send(data);

const { createErrorResponse } = require('../../response');
const { Fragment } = require('../../model/fragment');
var md = require('markdown-it')();
var path = require('path');

module.exports = async (req, res) => {
  let fragment;
  let data;
  try {
    switch (path.extname(req.params.id)) {
      case '.html':
        try {
          const fragment = await Fragment.byId(
            req.user,
            path.basename(req.params.id, path.extname(req.params.id))
          );
          data = await fragment.getData();
          data = md.render(data.toString());
          res.setHeader('Content-Type', 'text/html');
        } catch (error) {
          res.status(415).json(createErrorResponse('Unsupported type or conversion'));
        }
        break;
      case '':
        fragment = new Fragment(await Fragment.byId(req.user, req.params.id));
        data = await fragment.getData();
        res.setHeader('Content-Type', fragment.type);
        break;
      default:
        res.status(415).json(createErrorResponse('Unsupported type'));
    }
    return res.status(200).send(data);
  } catch (error) {
    return res.status(404).json(createErrorResponse('Fragment not found'));
  }
};
