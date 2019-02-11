const fs = require('fs');
const path = require('path');
const express = require('express');

let routes = fs.readdirSync(__dirname);
let router = express.Router();

routes.forEach(route => {
  let routeDir = path.join(__dirname, route);

  if (fs.lstatSync(routeDir).isDirectory()) {
    let modules = fs.readdirSync(routeDir);

    let subRoute = express.Router();

    modules.forEach(mod => {
      const Router = require(path.join(__dirname, route, mod));
      const router = new Router();

      mod = mod.split('.')[0];
      subRoute.use(`/${mod}`, router.router);
    });
    router.use('/' + route, subRoute);
  }
});

module.exports = router;