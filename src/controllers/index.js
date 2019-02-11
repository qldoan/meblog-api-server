const UserController = require('./user');
const PostController = require('./post');
const ProjectController = require('./project');

const _UserController = new UserController();
const _PostController = new PostController();
const _ProjectController = new ProjectController();

module.exports = {
  UserController: _UserController,
  PostController: _PostController,
  ProjectController: _ProjectController
};
