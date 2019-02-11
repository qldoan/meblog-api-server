/* *
   * support later
   */
let parseFilter = (req) => {
  let filter = req.query['filter'];

  try {
    filter = JSON.parse(filter);
  } catch (ignore) {
    filter = null;
  }
  return filter || {};
};

/**
 * Support later
 */
let parseOrder = (req) => {
  let order = req.query['order'];

  try {
    order = JSON.parse(order);
  } catch (ignore) {
    order = null;
  }
  return order || {
    updated_at: 'desc'
  };
};

module.exports = (req, res, next) => {
  try {
    const filter = parseFilter(req);
    const order = parseOrder(req);
    const page = parseInt(req.query['page'] || 1);
    const limit = parseInt(req.query['limit'] || 10);
    const offset = parseInt(req.query['offset']) || (page - 1) * limit;
    
    req.pageInfo = {
      filter,
      limit,
      offset,
      order,
      page
    };
    
    next();
  } catch (error) {
    next(error);
  }
};
