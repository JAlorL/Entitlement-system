import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import RequestAccess from "./RequestAccess";

@Table({
  timestamps: true,
  tableName: "users",
  modelName: "User",
})
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare role: string;

  @HasMany(() => RequestAccess)
  declare testRequests: RequestAccess[];
}

export default User;
