import sequelize from "./connection";

const syncDB = async () => {
  await sequelize.sync({ force: true });
  console.log("Database tables synchronised!");
};
syncDB();
