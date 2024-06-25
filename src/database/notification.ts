// import { DataTypes, Model } from 'sequelize';
// import sequelize from '../initDB';
// import User from './user';

// class Notification extends Model {
//     public id!: string;
//     public user_id!: string;
//     public message!: string;
//     public status!: string;
// }

// Notification.init(
//     {
//         id: {
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//         },
//         user_id: {
//             type: DataTypes.UUID,
//             allowNull: false,
//         },
//         message: {
//             type: DataTypes.TEXT,
//             allowNull: false,
//         },
//         status: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     },
//     {
//         sequelize,
//         tableName: 'notifications',
//     }
// );

// // Define associations
// Notification.belongsTo(User, { foreignKey: 'user_id' });

// export default Notification;
