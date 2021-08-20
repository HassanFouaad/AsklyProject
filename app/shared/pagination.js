module.exports = paginationwithCondition = async (model, req, option) => {
  if (!model || !req || !option) {
    throw new Error(
      "The function should take 3 arguments model , req and option"
    );
  }
  // number of records per page
  let limit = Math.abs(Number(req.query.limit));

  if (!limit || limit >= 50 || Number.isNaN(limit)) {
    limit = 5;
  }

  let page = Math.abs(Number(req.query.page));

  if (Number.isNaN(page)) {
    page = 1;
  }
  const error = {
    message: "",
    status: "",
  };
  let offset = 0 + (page - 1) * limit;

  option["limit"] = limit;
  option["offset"] = offset;
  const modelToPaginate = await model.findAndCountAll(option);

  let thisCount = modelToPaginate.count;

  let pages = Math.ceil(Number(modelToPaginate.count) / limit);

  if (Array.isArray(modelToPaginate.count)) {
    pages = Math.ceil(Number(parseInt(thisCount[0].count)) / limit);
    thisCount = parseInt(thisCount[0].count);
  }
  const paginated = {
    result: modelToPaginate.rows,
    thisPage: page,
    allPages: pages,
    count: thisCount,
  };
  return {
    paginated,
    error,
  };
};
