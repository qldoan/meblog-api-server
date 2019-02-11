const processId = params => {
  if (params.id) {
    params.id = Number.isInteger(parseInt(params.id)) ? parseInt(params.id) : params.id;
  }
  return params;
};

module.exports = class BaseController {
  constructor(Model) {
    this.Model = Model;
  }

  async create(params) {
    params = processId(params);
    return await this.Model.create(params);
  }

  async delete(params) {
    params = processId(params);
    const item = await this.Model.findById(params.id);

    return await item.destroy(params);
  }

  async getItem(params) {
    params = processId(params);
    return await this.Model.findOne({
      where: params
    });
  }

  async getList(params = {}, options = {limit: 10, offset: 0}) {
    params = processId(params);
    params = Object.assign(params, options.filter);
    return await this.Model.findAndCountAll({
      where: params,
      limit: options.limit,
      offset: options.offset
    });
  }

  async update(params) {
    params = processId(params);
    const item = await this.Model.findById(params.id);
    
    return await item.update(params);
  }

};
