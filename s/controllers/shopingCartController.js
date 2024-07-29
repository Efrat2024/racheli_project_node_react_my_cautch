const ShopingCart = require("../models/shopingCart");
const mongoose = require('mongoose');

const createNewProduct = async (req, res) => {
    const { couch } = req.body;
    const userId = req.user?._id;

    if (!userId) {
        return res.status(400).json({ message: 'User ID not found in token' });
    }

    try {
        const product = await ShopingCart.create({
            couch,
            user: new mongoose.Types.ObjectId(userId)
        });
        console.log('Product created:', product);
        res.status(201).json(product);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'An error occurred while creating the product.' });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const products = await ShopingCart.find({ user:req.user._id })
        res.json(products);
        console.log(products);
    } catch (error) {
        console.error('Error getting products:', error);
        return res.status(500).json({ message: 'An error occurred while getting the products.' });
    }
};


const updateProduct = async (req, res) => {
    const { id } = req.params;  
    const { amount } = req.body; 

    try {
        const product = await ShopingCart.findById(id).exec();

        if (!product) {
            return res.status(400).json({ message: 'Product not found' });
        }

        product.amount = amount || product.amount;
        
        const updatedProduct = await product.save();

        res.json({ message: `'${updatedProduct._id}' updated`, updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'An error occurred while updating the product.' });
    }
};


const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ShopingCart.findById(id).exec();
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await ShopingCart.deleteOne({ _id: id });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'An error occurred while deleting the product.' });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ShopingCart.findOne({ _id: id, user:new mongoose.Types.ObjectId(req.user._id) }).lean();
        if (!product) {
            return res.status(400).json({ message: 'No product found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error getting product by ID:', error);
        return res.status(500).json({ message: 'An error occurred while getting the product.' });
    }
};

module.exports = {
    createNewProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};