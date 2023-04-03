import { CustomerModel } from '../model/index.js';
import sequelize from '../../../utils/dbConfig/db.Config.js';
import { CustomerMaster } from '../schema/index.js';
import { where } from 'sequelize';

class CustomerController {

    // Add Customers logic

    async add(req, res) {
        let transaction;
        try {
            let { customer_name, customer_number, customer_email, customer_address } = req.body;
            async function checkEmailExists(customer_email) {
                const customer = await CustomerMaster.findOne({ where: { customer_email } });
                return customer !== null;
            }
            const exists = await checkEmailExists(customer_email);
            if (exists) {
                return res.status(409).json({ error: 'Email exists in the database. Please try different email ID.' });
            } else {
                transaction = await sequelize.transaction();
                const customerData = await CustomerModel.addOne({
                    customer_name,
                    customer_number,
                    customer_email,
                    customer_address,
                }, transaction);
                await transaction.commit();
                return res.status(201).json(customerData);
            }
        } catch (error) {
            console.log("Can't Add Customer \n" + error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

    }

    // Get Customers logic

    async get(req, res) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const customerData = await CustomerModel.getAll(["customer_id", "customer_name", "customer_number", "customer_email", "customer_address"])
            await transaction.commit();
            return res.status(201).json(customerData);
        } catch (error) {
            console.log("Can't Find Customer Data" + error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Get by particular CustomerID logic

    async getOneCustomer(req, res) {

        let transaction;
        try {
            let customer_id = req.params.id; // retrieve the value of `id` from the URL parameter
            transaction = await sequelize.transaction();
            const customerData = await CustomerModel.getOne({ customer_id }, ["customer_id", "customer_name", "customer_number", "customer_email", "customer_address"]);
            await transaction.commit();
            if (customerData) {
                return res.status(200).json(customerData); // send 200 OK status and the customer data
            } else {
                return res.status(404).json({ error: "Customer Not Found" }); // send 404 Not Found status if customer data is not found
            }

        } catch (error) {
            console.log("Can't Find particular Customer Data " + error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Update by CustomersID logic

    async updateOneCustomer(req, res) {
        let transaction;
        try {
            let customer_id = parseInt(req.params.id);
            let { customer_name, customer_number, customer_email, customer_address } = req.body;
            transaction = await sequelize.transaction();
            const customerData = await CustomerModel.updateOneCustomer({ customer_id }, {
                customer_name,
                customer_number,
                customer_email,
                customer_address
            }, transaction);
            await transaction.commit();
            if (customerData[0]) {
                return res.status(200).json({ message: "Customer data updated successfully" }); // send 200 OK status and success message
            } else {
                return res.status(404).json({ error: "Customer Not Found" }); // send 404 Not Found status if customer data is not found
            }


        } catch (error) {
            console.log("Can't Update Customer data \n " + error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Delete Customers logic

    async deleteCustomer(req, res) {
        let transaction;
        try {
            let customer_id = req.params.id;
            transaction = await sequelize.transaction();
            const customerData = await CustomerModel.dropCustomer({ customer_id });
            await transaction.commit();
            return res.status(200).json({ message: "Customer is successfully deleted" });
        } catch (error) {
            console.log("Can't Delete Customer " + error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

}
export default new CustomerController();