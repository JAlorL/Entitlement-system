import Dataset from "./models/Dataset";
import User from "./models/User";
import "./connection";
import Frequency from "./models/Frequency";

const populateUsers = async () => {
  await User.bulkCreate([
    { name: "User Quant", role: "quant" },
    { name: "User Ops", role: "ops" },
  ]);
  console.log('Users created!')
};

const populateDatasets = async () => {
  await Dataset.bulkCreate(
    [
      {
        name: "bitcoin",
        symbol: "BTC",
        frequencies_dataset: [
          { frequency_id: "1" },
          { frequency_id: "2" },
          { frequency_id: "3" },
        ],
      },
      {
        name: "ethereum",
        symbol: "ETH",
        frequencies_dataset: [{ frequency_id: "2" }],
      },
    ],

    { include: ["frequencies_dataset"] }
  );
  console.log('Datasets created and linked to their frequencies!')
};

const populateFrequencies = async () => {
  await Frequency.bulkCreate([
    { frequency: "hourly" },
    { frequency: "daily" },
    { frequency: "monthly" },
  ]);
  console.log('Frequencies created!')
};

populateUsers();
populateFrequencies();
populateDatasets();
