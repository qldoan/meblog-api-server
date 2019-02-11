module.exports = (req, res, next) => {
  try {
    if (!req.header('authorization')) {
      throw new ApplicationException({ code: 401, message: 'Unauthorized'});
    }
    const authorization = req.header('authorization').toLowerCase().replace('bearer', '').trim();
    const crypto = require('crypto')
      , algorithm = 'aes-256-ctr'
      , password = config.secret;

    const decipher = crypto.createDecipher(algorithm, password);
    let data = decipher.update(authorization, 'hex', 'utf8');
    
    data += decipher.final('utf8');
    
    if (!data) {
      throw new ApplicationException({ code: 401, message: 'Unauthorized'});
    } else {
      req.user = JSON.parse(data);
      let now = (new Date()).getTime();
      
      if (now > req.user.expired) {
        throw new ApplicationException({ code: 401, message: 'Unauthorized'});
      }
      next();
    }
    
  } catch (error) {
    next(error);
  }
};