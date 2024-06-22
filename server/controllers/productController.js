// controllers/productController.js
import Product from '../models/Product.js';

const create = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (err) {
    res.status(400).send(err);
  }
};

const list = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

const read = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send();
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

const update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).send();
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
};

const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send();
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

const removeAll = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.status(200).send({ message: 'All products removed' });
  } catch (err) {
    res.status(500).send(err);
  }
};

const findByName = async (req, res) => {
  try {
    const products = await Product.find({ name: { $regex: req.query.name, $options: 'i' } });
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

const productByID = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).send();
    req.product = product;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

export {
  create,
  list,
  read,
  update,
  remove,
  removeAll,
  findByName,
  productByID,
};
