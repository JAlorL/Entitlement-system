import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User";
import DatasetFrequency from "./DatasetFrequency";

@Table({
  timestamps: true,
  tableName: "requests",
  modelName: "RequestAccess",
})
class RequestAccess extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare user_id?: string;

  @BelongsTo(() => DatasetFrequency)
  declare frequency: DatasetFrequency;

  @ForeignKey(() => DatasetFrequency)
  @Column({
    type: DataType.INTEGER,
  })
  declare dataset_id?: string;

  @ForeignKey(() => DatasetFrequency)
  @Column({
    type: DataType.INTEGER,
  })
  declare frequency_id?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  declare status: boolean;
}
export default RequestAccess;
