import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import DatasetFrequency from "./DatasetFrequency";

@Table({
  timestamps: true,
  tableName: "frequencies",
  modelName: "Frequency",
})
class Frequency extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare frequency: string;

  @HasMany(() => DatasetFrequency)
  declare datasets_frequency: DatasetFrequency[];
}

export default Frequency;
