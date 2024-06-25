import sequelize from "./connection";

const syncDB = async () => {
  await sequelize.sync({ force: true });
  console.log("All models were synchronized successfully.");
};
syncDB();
