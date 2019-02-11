const path = require('path');

global.env = process.env.NODE_ENV || 'development';

global.config = require('./config');

//Error handler

global.ApplicationException = class ApplicationException extends Error {
  constructor({code, message}) {
    super();
    this.code = code;
    this.message = message;
  }
  toJSON() {
    return {
      code: this.code,
      message: this.message
    };
  }
};

global.requireFromRoot = (name) => {
  if (name.charAt(0) != '/') {
    name = '/' + name;
  }
  return require(path.join(__dirname, name));
};