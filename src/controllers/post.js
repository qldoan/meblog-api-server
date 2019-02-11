const BaseController = require('./base')
  , Post = requireFromRoot('models/project');

module.exports = class PostController extends BaseController {
  constructor() {
    super(Post);
  }
};