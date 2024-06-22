import express from 'express';
import {
  create,
  list,
  read,
  update,
  remove,
  removeAll,
  findByName,
  productByID,
} from '../controllers/productController.js';

const router = express.Router();

// Create a new product
router.route('/products').post(create);

// Get all products
router.route('/products').get(list);

// Remove all products
router.route('/products').delete(removeAll);

// Get product by id
router.route('/products/:id').get(read);

// Update product by id
router.route('/products/:id').put(update);

// Remove product by id
router.route('/products/:id').delete(remove);

// Find products by name
router.route('/products').get(findByName);

router.param('id', productByID);

export default router;
