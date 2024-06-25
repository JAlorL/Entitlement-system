import {
  Table,
  Column,
  Model,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Dataset from "./Dataset";
import Frequency from "./Frequency";

@Table({
  timestamps: true,
  tableName: "datasets_frequencies",
  modelName: "DatasetFrequency",
})
class DatasetFrequency extends Model {
  @BelongsTo(() => Dataset)
  declare dataset: Dataset;

  @ForeignKey(() => Dataset)
  @Column({
    primaryKey: true,
  })
  declare dataset_id: number;

  @BelongsTo(() => Frequency)
  declare frequency: Frequency;

  @ForeignKey(() => Frequency)
  @Column({
    primaryKey: true,
  })
  declare frequency_id: number;
}

export default DatasetFrequency;
