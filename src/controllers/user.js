const BaseController = require('./base')
  , User = requireFromRoot('models/user')
  , crypto = require('crypto');

let hashPassword = (username, password) => {
  const salt = username;

  let hash = crypto.createHmac('sha512', salt);

  hash.update(password);
  return hash.digest('hex');
};

module.exports = class UserController extends BaseController {
  constructor() {
    super(User);
  }

  async login(params) {
    try {
      params.password = hashPassword(params.username, params.password);
      const user = await this.getItem(params);

      if (!user) {
        throw new ApplicationException({ code: 401, message: 'Wrong username or password'});
      }
      let now = (new Date()).getTime()
        , oneday = 1 * 24 * 60 * 60 * 1000 // timestamp for one day
        , result = Object.assign({ username: user.username }, { id: user.id }, { expired: now + oneday })
        , algorithm = 'aes-256-ctr'
        , password = config.secret;
        
      let cipher = crypto.createCipher(algorithm, password);
      let token = cipher.update(JSON.stringify(result), 'utf8', 'hex');

      token += cipher.final('hex');
      return {
        token: token
      };
      
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(params) {
    try {
      params.password = hashPassword(params.username, params.password);
      let { id, username, password } = params;
      let newHashPassword = hashPassword(username, params.new_password);
      
      const user = await this.getItem({ id, username, password });

      if (!user) {
        throw new ApplicationException({ code: 401, message: 'Wrong username or password'});
      }
      
      params.password = newHashPassword;
      return await this.update(params);
    } catch (error) {
      throw error;
    }
  }

  async register(params) {
    try {
      params.password = hashPassword(params.username, params.password);

      return await this.create(params);
    } catch (error) {
      // console.log(error)
      throw error;
    }
  }

};