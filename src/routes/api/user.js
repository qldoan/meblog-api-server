const middlewares = requireFromRoot('middlewares');
const BaseRoutes = requireFromRoot('routes/base');
const { UserController } = requireFromRoot('controllers');

module.exports = class CustomerRoutes extends BaseRoutes {
  constructor() {
    super(UserController);
    this.router.post('/login', this.route(this.login));
    this.router.put('/update/:id', [middlewares.authorize], this.route(this.updatePassword));
    this.router.post('/register', [middlewares.authorize], this.route(this.register));
  }

  async login(req, res) {
    try {
      const result = await this.Controller.login(req.body);

      this.onSuccess(res, result);
    } catch (error) {
      this.onError(res, error);
    }
  }

  async updatePassword(req, res) {
    try {
      req.body = Object.assign(req.body, {id: req.params.id});
      const user = await this.Controller.updatePassword(req.body);
      
      this.onSuccess(res, user);
    } catch (error) {
      this.onError(res, error);
    }
  }

  async register(req, res) {
    try {
      const user = await this.Controller.register(req.body);

      this.onSuccess(res, user);
    } catch (error) {
      this.onError(res, error);
    }
  }
};
