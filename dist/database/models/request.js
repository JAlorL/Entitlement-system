"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const initDB_1 = __importDefault(require("../initDB"));
const user_1 = __importDefault(require("./user"));
const dataset_1 = __importDefault(require("./dataset"));
class Request extends sequelize_1.Model {
}
Request.init({
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
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: initDB_1.default,
    tableName: 'requests',
});
// Define associations
Request.belongsTo(user_1.default, { foreignKey: 'user_id' });
Request.belongsTo(dataset_1.default, { foreignKey: 'dataset_id' });
exports.default = Request;
