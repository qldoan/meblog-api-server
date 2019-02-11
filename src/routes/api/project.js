const BaseRoutes = requireFromRoot('routes/base');
const { ProjectController } = requireFromRoot('controllers');

module.exports = class ProjectRoutes extends BaseRoutes {
  constructor() {
    super(ProjectController);
  }
};