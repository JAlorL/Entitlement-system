import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import DatasetFrequency from "./DatasetFrequency";

@Table({
  timestamps: true,
  tableName: "datasets",
  modelName: "Dataset",
})
class Dataset extends Model {
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
  declare symbol: string;

  @HasMany(() => DatasetFrequency, {})
  declare frequencies_dataset: DatasetFrequency[];
}

export default Dataset;
