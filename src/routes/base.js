
const middlewares = requireFromRoot('middlewares');
const express = require('express');

module.exports = class BaseRoutes {
  constructor(Controller) {
    this.Controller = Controller;
    this.router = express.Router();
    this.router.get('/', [middlewares.authorize, middlewares.pageInfo], this.route(this.getList));
    this.router.get('/:id', [middlewares.authorize], this.route(this.getItem));
    this.router.post('/', [middlewares.authorize], this.route(this.create));
    this.router.put('/:id', [middlewares.authorize], this.route(this.update));
    this.router.delete('/:id', [middlewares.authorize], this.route(this.delete));
  }

  async create(req, res) {
    try {
      res.item = await this.Controller.create(req.body);
      this.onSuccess(res, res.item);
    } catch (error) {
      this.onError(res, error);
    }
  }

  async delete(req, res) {
    try {
      await this.Controller.delete(req.params);
      this.onSuccess(res);
    } catch (error) {
      this.onError(res, error);
    }
  }
  
  async getItem(req, res) {
    try {
      req.item = await this.Controller.getItem(req.params);
      if (!req.item) {
        throw new ApplicationException({ code: 404, message: 'Not found'});
      }
      this.onSuccess(res, req.item);
    } catch (error) {
      this.onError(res, error);
    }
  }

  async getList(req, res) {
    try {
      req.items = await this.Controller.getList({}, req.pageInfo);
      this.onSuccessAsList(res, req.items, req.pageInfo);
    } catch (error) {
      this.onError(res, error);
    }
  }
  
  async update(req, res) {
    try {
      req.body = Object.assign(req.body, req.params);
      res.item = await this.Controller.update(req.body);
      this.onSuccess(res, res.item);
    } catch (error) {
      this.onError(res, error);
    }
  }

  onError(res, error) {
    let json = null;
  
    if (error.toJSON) {
      json = error.toJSON();
    } else {
      json = {
        code: 500,
        message: 'Internal server error'
      };
    }
    res.status(json.code).json(json);
  }

  onSuccess(res, object = {}, extras = {}) {
    if (object.toJSON) {
      object = object.toJSON();
    }
    object = object || {};
    if (Object.keys(object).length === 0) {
      res.json({
        code: 200
      });
    } else {
      res.json({
        code: 200,
        results: Object.assign({
          object
        }, extras)
      });
    }
  }

  onSuccessAsList(res, objects = [], extras = {}, currentPage = {page: 1}) {
    if (objects.toJSON) {
      objects = objects.toJSON();
    }
    res.json({
      code: 200,
      results: Object.assign({
        objects
      }, extras),
      pagination: {
        'current_page': currentPage.page,
        'next_page': currentPage.page + 1,
        'prev_page': currentPage.page - 1,
        'limit' : currentPage.limit
      }
    });
  }

  route(func) {
    return (req, res) => func
      .bind(this)(req, res)
      .catch(err => this.onError(res, err));
  }
};