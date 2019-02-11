const BaseController = require('./base')
  , Project = requireFromRoot('models/project');

module.exports = class ProjectController extends BaseController {
  constructor() {
    super(Project);
  }
};