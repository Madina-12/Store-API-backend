const Product = require("../models/products");

const getAllProductsStatic = async (req, res) => {
  const Products = await Product.find({ price: { $gt: 50 } })
    .sort(price)
    .select(name, price);
  res.status(200).json({ Products, nbhits: Products.length });
};

const getAllProducts = async (req, res) => {
  const { name, featured, sort, fields, numericFilters, company } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $option: i };
  }
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
    };
    const regEx = /\b(>|<|>=|<=|=)\b/g;
    let filters = numericFilters.replace(regEx, 
      (map) => `-${operatorMap[map]}-`);
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((element) => {
      const [field, operator, value] = element.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });

  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result.sort(sortList);
  } else {
    result.sort("createdAt");
  }
  if (fields) {
    const fieldList = fields.split(',').join(" ")
    result.select(fieldList)
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page-1)*limit
  result = result.skip(skip).limit(limit)

  const Products = await result
  res.status(200).json({Products, nbHits: Products.length})
};
}

module.exports = {getAllProducts, getAllProductsStatic}
