import { ProductMaster } from '../schema/index.js';
import { Transaction } from "sequelize";

class ProductModel {

    // Add new product details

    async addOne(adminObj,
        transaction = Transaction) {
        try {
            return await ProductMaster.create(adminObj, { transaction });
        } catch (error) {
            console.log("Failed to add product detail " + error);
            return res.status(500).json({ error: "Failed to add Product detail. Please try again later. " + error });
        }
    }

    // Get all products details

    async getAll(attributes = []) {
        try {
            return await ProductMaster.findAll({ attributes });
        } catch (error) {
            console.log("Failed to find product details " + error)
            return res.status(500).json({ error: "Failed to find Products detail. Please try again later. " + error });
        }
    }

    // Get particuler product detail

    async getOne(condition = {}, attributes = ['id'], adminObj, transaction = Transaction) {
        try {
            return await ProductMaster.findOne({ where: condition, attributes }, adminObj, transaction);
        } catch (error) {
            console.log("Failed to particuler product detail " + error)
            return res.status(500).json({ error: "Failed to find particuler Product detail. Please try again later. " + error });
        }
    }

    // Update Product Detail

    async updateOneProduct(condition = {}, value = {}, attributes = ["id"], transaction = null) {
        try {
            return await ProductMaster.update(value, { where: condition, attributes }, transaction)
        } catch (error) {
            console.log("Failed to update product detail " + error);
            return res.status(500).json({ error: "Failed to update Product detail. Please try again later. " + error });
        }
    }

    // Delete Product Detail for Database

    async dropProduct(condition = {}, attributes = ["id"], transaction = Transaction) {
        try {
            return await CustomerMaster.destroy({ where: condition, attributes }, transaction)
        } catch (error) {
            console.log("Failed to delete product detail " + error);
            return res.status(500).json({ error: "Failed to delete Prouct detail. Please try again later. " + error });
        }
    }
}
export default new ProductModel();