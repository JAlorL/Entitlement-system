import Dataset from "../database/models/Dataset";
import DatasetFrequency from "../database/models/DatasetFrequency";
import Frequency from "../database/models/Frequency";

export const getDatasetsWithFrequencies = async () => {
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
      frequencyId: freq.frequency_id,
      frequency: freq.frequency.frequency,
    })),
  }));

  return formattedData;
};

export const getDataPairById = async (datasetId: string, freqId: string) => {
  const resPair = await DatasetFrequency.findAll({
    where: { dataset_id: datasetId, frequency_id: freqId },
  });
  console.log(resPair);
  return resPair;
};
