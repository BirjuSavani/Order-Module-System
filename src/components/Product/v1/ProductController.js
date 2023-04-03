import { ProductModel } from '../model/index.js';
import sequelize from '../../../utils/dbConfig/db.Config.js';
import { ProductMaster } from '../schema/index.js';

class ProductController {

    // Add Products logic

    async add(req, res) {
        let transaction;
        try {
            let { id, title, description, price, discount_percentage, rating, stock, brand, category, thumbnail, images } = req.body;
            transaction = await sequelize.transaction();
            const productData = await ProductModel.addOne({
                id,
                title,
                description,
                price,
                discount_percentage,
                rating,
                stock,
                brand,
                category,
                thumbnail,
                images
            }, transaction);
            await transaction.commit();
            res.status(200).send("Product Added successfully");
            return res.send(productData);

        } catch (error) {
            console.log("Can't Add Product \n" + error);
            return res.status(500).json({ error: "Unable to add product" });
        }

    }

    // Get Product Iteam logic

    async get(req, res) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const productData = await ProductModel.getAll(["id", "title", "description", "price", "discount_percentage", "rating", "stock", "brand", "category",
                "thumbnail", "images"
            ]);
            await transaction.commit();
            return res.status(200).send(productData);
        } catch (error) {
            console.log("Can't Find Products \n" + error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Get by ProductID logic

    async getOneProduct(req, res) {

        let transaction;
        try {
            let id = req.params.id; // retrieve the value of `id` from the URL parameter
            transaction = await sequelize.transaction();
            const customerData = await ProductModel.getOne({ id }, ["id", "title", "description", "price", "discount_percentage", "rating", "stock", "brand", "category",
                "thumbnail", "images"
            ]);
            await transaction.commit();
            if (productData) {
                return res.status(200).json(productData);
            } else {
                return res.status(404).json({ message: "Product not found." });
            }
        } catch (error) {
            console.log("Can't Find particular Product \n" + error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    // Update by ProductID logic

    async updateOneProduct(req, res) {
        let transaction;
        try {
            let id = parseInt(req.params.id);
            let { title, description, price, discount_percentage, rating, stock, brand, category, thumbnail, images } = req.body;
            transaction = await sequelize.transaction();
            const customerData = await ProductModel.updateOneProduct({ id }, {
                id,
                title,
                description,
                price,
                discount_percentage,
                rating,
                stock,
                brand,
                category,
                thumbnail,
                images
            }, transaction);
            await transaction.commit();
            return res.status(200).send({ Message: 'Product updated successfully', productData: customerData });
            //return res.send(customerData);

        } catch (error) {
            console.log("Can't updated Product details \n" + error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    // Delete Product logic

    async deleteProduct(req, res) {
        let transaction;
        try {
            let id = req.params.id;
            transaction = await sequelize.transaction();
            const customerData = await CustomerModel.dropProduct({ id });
            await transaction.commit();
            return res.sendStatus(204);
        } catch (error) {
            console.log("Can't Delete Product \n" + error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

}
export default new ProductController();