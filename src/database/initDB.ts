import sequelize from "./connection";

const syncDB = async () => {
  await sequelize.sync({ force: true });
  console.log("Database tables synchronised!");
};

syncDB().catch((error) => {
  console.error("Failed to synchronise database tables:", error);
  process.exit(1);
});
