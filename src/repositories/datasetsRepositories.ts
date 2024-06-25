import Dataset from "../database/models/Dataset";
import DatasetFrequency from "../database/models/DatasetFrequency";
import Frequency from "../database/models/Frequency";

const getDatasetsWithFrequencies = async () => {
  const datasets = await Dataset.findAll({
    include: [
      {
        model: DatasetFrequency,
        include: [Frequency],
      },
    ],
  });

  const formattedData = datasets.map((dataset) => ({
    id: dataset.id,
    name: dataset.name,
    symbol: dataset.symbol,
    frequencies_dataset: dataset.frequencies_dataset.map((freq) => ({
      frequency: freq.frequency.frequency,
    })),
  }));

  return formattedData;
};

export default getDatasetsWithFrequencies;
