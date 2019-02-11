const BaseRoutes = requireFromRoot('routes/base');
const { PostController } = requireFromRoot('controllers');

module.exports = class PostRoutes extends BaseRoutes {
  constructor() {
    super(PostController);
  }
};