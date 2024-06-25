import Dataset from "./models/Dataset";
import User from "./models/User";
import "./connection";
import Frequency from "./models/Frequency";
import DatasetFrequency from "./models/DatasetFrequency";
// import Frequency from "./models/Frequency";

const populateUsers = async () => {
  await User.bulkCreate([
    { name: "User Quant", role: "quant" },
    { name: "User Ops", role: "ops" },
  ]);
};

const populateDatasets = async () => {
  await Dataset.bulkCreate(
    [
      {
        name: "Bitcoin",
        symbol: "BTC",
        frequencies_dataset: [
          { frequency_id: "1" },
          { frequency_id: "2" },
          { frequency_id: "3" },
        ],
      },
      {
        name: "Ethereum",
        symbol: "ETH",
        frequencies_dataset: [{ frequency_id: "2" }],
      },
    ],

    { include: ["frequencies_dataset"] }
  );
};

const populateFrequencies = async () => {
  await Frequency.bulkCreate([
    { frequency: "hourly" },
    { frequency: "daily" },
    { frequency: "monthly" },
  ]);
};

const queryDatasetFrequencies = async () => {
  const completeDatasets = await Dataset.findAll({
    include: [
      {
        association: "frequencies_dataset",
        required: true,
      },
    ],
    raw: true,
    subQuery: true,
  });
  console.log(completeDatasets);
};
// populateUsers();

// User.findAll({ raw: true }).then((data) => console.log("data: ", data));

// populateFrequencies();
// populateDatasets();
// queryDatasetFrequencies();
async function getDatasetsWithFrequencies() {
  const datasets = await Dataset.findAll({
    include: [
      {
        model: DatasetFrequency,
        include: [Frequency],
      },
    ],
  });

  // Format the data
  const formattedData = datasets.map((dataset) => ({
    id: dataset.id,
    name: dataset.name,
    symbol: dataset.symbol,
    frequencies_dataset: dataset.frequencies_dataset.map((freq) => ({
      frequency: freq.frequency.frequency,
    })),
  }));

  return formattedData;
}

getDatasetsWithFrequencies().then((data) =>
  console.log(JSON.stringify(data, null, 2))
);
