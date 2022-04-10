import Product from './ProductModel';

const ProductAPI = {
  createProduct: async (req, res, next) => {
    try {
      const {
        title,
        sku_id,
        price,
        weight,
        weight_unit,
        currency,
        description,
      } = req.body;
      if (!title || !sku_id || !price)
        throw new Error('Title/SKU_ID/Price are mandatory ');
      const prod = await Product.findOne({ sku_id });
      if (prod) throw new Error('Product with same SKU already exist.');
      if (price <= 0) throw new Error('Invalid price');
      const product = await Product.create({
        title,
        sku_id,
        price,
        weight,
        weight_unit,
        currency,
        description,
      });

      return res
        .status(200)
        .json({ payload: product, message: 'Product Created' });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const { prod_id } = req?.params;
      const prod = await Product.findOne({ _id: prod_id });
      if (!prod) throw new Error('Invalid Product ID');
      return res
        .status(200)
        .json({ payload: prod, message: 'Product Fetched' });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  },
  getAllProducts: async (req, res, next) => {
    try {
      console.log('Hello hello');
      const prod = await Product.find({}).limit(10);
      if (!prod) throw new Error('Error occured in fetching Products');
      return res
        .status(200)
        .json({ payload: prod, message: 'Product List Fetched' });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const { prod_id } = req.params;
      const { data } = req.body;
      const p = await Product.findOne({ _id: prod_id });
      if (!p) throw new Error('Invalid Product ID');
      if (data?.product_img) delete data.product_img;
      const product = await Product.findOneAndUpdate({ _id: prod_id }, data);
      if (!product) throw new Error('There was error in creating product');
      return res
        .status(200)
        .json({ payload: product, message: 'Product Updated Successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const { prod_id } = req?.params;
      const prod = await Product.findOneAndDelete({ _id: prod_id });
      if (!prod) throw new Error('Invalid Product ID');
      return res
        .status(200)
        .json({ payload: prod, message: 'Product Deleted' });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  },
};

export default ProductAPI;
