import sequelize from '../../../utils/dbConfig/db.Config.js';
import { CartIteamMaster } from '../../CartIteam/schema/index.js';
import { OrderModel } from '../model/index.js';
import { CartIteamModel } from '../../CartIteam/model/index.js';
import { CustomerMaster } from '../../Customer/schema/index.js';
import { ProductMaster } from '../../Product/schema/index.js';
import { NUMBER, where } from 'sequelize';


class OrderController {

    // CART ADD!

    async add_Cart(req, res) {
        // let transaction;
        try {

            // CART ADD
            let cart_id = req.body.cart_id
            let cartDetail = req.body.cart_detail
            let cartData = [];
            //console.log(req.body)

            for (const product of cartDetail) {

                const productDetail = await ProductMaster.findOne({
                    where: {
                        id: product.product_id
                    }
                })
                if (productDetail.stock < product.qty) {
                    return res.status(422).json({ message: `${productDetail.title} having only ${productDetail.stock}.` })
                }
                await CartIteamModel.addOne({
                    cart_id,
                    product_id: product.product_id,
                    quantity: product.qty,
                    price: Number(product.qty) * Number(productDetail.price)
                });

            }
            //await transaction.commit();
            return res.status(200).json({ message: "Cart added successfully" });
        } catch (error) {
            console.log("Can't Add Carts\ n " + error);
            return res.status(500).json({ error: "Failed to add cart. Please try again later." });
        }
    }


    // Order added!

    async place_order(req, res) {
        let transaction;
        try {

            //let { customer_id, total_price, status } = req.body;

            let customer_id = req.body.customer_id
            let cart_id = req.body.cart_id
            let total_price = req.body.total_price

            //let status = [req.body.status]
            transaction = await sequelize.transaction();
            const OrderData = await OrderModel.addOne({

                customer_id,
                cart_id,
                total_price,
                //status,

            }, transaction);
            await transaction.commit();
            return res.status(201).json({
                message: 'Order added successfully',
                data: OrderData,
            });

        } catch (error) {
            console.log("Can't Add Orders \n " + error);
            return res.status(500).json({
                message: 'Error adding order: ' + error,
            });
        }

    }

    // Get particular order Detail

    async getOneOrder(req, res) {
        let transaction;
        try {
            let order_id = req.params.id;
            transaction = await sequelize.transaction();
            const orderData = await OrderModel.getOne({ order_id });
            await transaction.commit();
            if (!orderData) {
                return res.status(404).json({ message: "Order not found" });
            }
            return res.status(200).json(orderData);
        } catch (error) {
            console.log("Can't Find particular Order Data " + error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // Update using CartID_(OrderID) logic.

    async update_Cart(req, res) {

        try {
            const cart_id = req.params.id;
            const cartDetail = req.body.cart_detail;
            const cartData = [];

            for (const product of cartDetail) {
                const productDetail = await ProductMaster.findOne({
                    where: {
                        id: product.product_id,
                    },
                });

                if (productDetail.stock < product.qty) {
                    return res.status(422).json({ message: `${productDetail.title} having only ${productDetail.stock}.` })
                }
                console.log(cartDetail);
                console.log(cart_id, product.product_id);
                await CartIteamModel.updateone({ cart_id, product_id: product.product_id }, {

                    quantity: product.qty,
                    price: Number(product.qty) * Number(productDetail.price),

                })
            }
            return res.status(200).json({ message: "Cart updated successfully......" });
        } catch (error) {
            console.log("Can't Update Carts  " + error);
            return res.status(500).json({ message: "Unable to update the cart." });
        }
    }

    // First, delete the order and then " delete the cart ID ", rather than only deleting the cart.

    async deleteCart(req, res) {
        let transaction;
        try {
            let cart_id = req.params.id;
            console.log(cart_id)
            transaction = await sequelize.transaction();
            const customerData = await CartIteamModel.dropCart({ cart_id });
            await transaction.commit();
            if (customerData) {
                return res.status(200).json({ message: "Cart deleted successfully" });
            } else {
                return res.status(404).json({ message: "Unable to delete cart" });
            }
        } catch (error) {
            console.log("Can't Delete Carts " + error);
            return res.status(500).json({ message: "Unable to delete cart" });
        }
    }

    // Delete Cart's Product

    async deleteCartProduct(req, res) {

        try {
            let cart_id = req.params.id;
            let product_id = req.body.product_id
            console.log(cart_id, product_id)
            const customerData = await CartIteamModel.dropCartProduct({ cart_id, product_id });
            return res.status(200).json({ message: 'Product removed successfully.' });
        } catch (error) {
            console.log("Can't Delete Cart's Product " + error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // Delete Order 

    async deleteOrder(req, res) {
        let transaction;
        try {
            let order_id = req.params.id;
            console.log(order_id)
            transaction = await sequelize.transaction();
            const customerData = await OrderModel.dropOrder({ order_id });
            await transaction.commit();
            return res.status(200).json({ message: 'Order deleted successfully.' });
        } catch (error) {
            console.log("Can't delete order: " + error);
            return res.status(500).json({ message: "Failed to delete order." });
        }
    }

};

export default new OrderController();