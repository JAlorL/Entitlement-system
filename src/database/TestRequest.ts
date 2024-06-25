// import {
//   Table,
//   Column,
//   Model,
//   DataType,
//   CreatedAt,
//   UpdatedAt,
//   BeforeCreate,
//   HasMany,
//   PrimaryKey,
//   ForeignKey,
// } from "sequelize-typescript";
// import User from "./User";
// import Dataset from "./Dataset";

// @Table({
//   timestamps: true,
//   tableName: "testRequests",
//   modelName: "TestRequest",
// })
// class TestRequest extends Model {
//   @Column({
//     primaryKey: true,
//     type: DataType.UUID,
//     defaultValue: DataType.UUIDV4,
//   })
//   declare id: string;

//   @ForeignKey(() => User)
//   @Column({
//     type: DataType.INTEGER,
//   })
//   declare user_id?: string;

//   @ForeignKey(() => Dataset)
//   @Column({
//     type: DataType.INTEGER,
//   })
//   declare dataset_id?: string;

//   @Column({
//     type: DataType.STRING,
//   })
//   declare frequency: string;

//   @Column({
//     type: DataType.STRING,
//     defaultValue: null,
//   })
//   declare status: string;
// }
// export default TestRequest;
