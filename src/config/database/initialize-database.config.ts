import { Sequelize } from "sequelize";
import { databaseConfig } from "./database.config";

export const sequelize = new Sequelize(databaseConfig.database);

export const initializeDatabase = async (): Promise<void> => {
    // association examples
//   User.initialize(sequelize);
//   VivaService.initialize(sequelize);

  // Define associations
//   User.hasMany(VivaService);
//   VivaService.belongsTo(User);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
