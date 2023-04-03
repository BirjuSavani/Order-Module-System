import { Model, DataTypes, STRING } from 'sequelize';
import sequelize from '../../../utils/dbConfig/db.Config.js';
import { CustomerMaster } from '../../Customer/schema/index.js';
import { CartIteamMaster } from '../../CartIteam/schema/index.js';

class OrderMaster extends Model {

}

OrderMaster.init({
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customers',
            key: 'customer_id',
        },
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cart',
            key: 'ID',
        },
    },
    // total_price: {
    //     type: DataTypes.DECIMAL,
    //     allowNull: false,
    // },
    // status: {
    //     type: DataTypes.ENUM(STRING['pending', 'processing', 'shipped', 'delivered']),
    //     allowNull: false,
    // },
    // created_at: {
    //     type: DataTypes.DATE,
    //     allowNull: true
    // }
}, {
    sequelize,
    paranoid: true,
    underscored: true,
    createdAt: false,
    tableName: 'orders',
    timestamps: false
});

OrderMaster.belongsTo(CustomerMaster, {
    foreignKey: 'customer_id',
    sourceKey: 'customer_id'
})

OrderMaster.hasMany(CartIteamMaster, {
    foreignKey: 'cart_id',
    sourceKey: 'cart_id'
});



export default OrderMaster;