"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const initDB_1 = __importDefault(require("../initDB"));
const user_1 = __importDefault(require("./user"));
const dataset_1 = __importDefault(require("./dataset"));
class Access extends sequelize_1.Model {
}
Access.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    dataset_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    frequency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    expires_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: initDB_1.default,
    tableName: 'accesses',
});
// Define associations
Access.belongsTo(user_1.default, { foreignKey: 'user_id' });
Access.belongsTo(dataset_1.default, { foreignKey: 'dataset_id' });
exports.default = Access;
