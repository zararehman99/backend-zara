import { DataTypes, Model } from "sequelize"
import { sequelize } from "../config/database/initialize-database.config"

class TushLog extends Model {
  declare id: number
  declare babyId: number
  declare eventType: string
  declare stoolFrequency?: string
  declare stoolConsistency?: string
  declare diaperCondition?: string
  declare abnormalities?: string
  declare additionalNotes?: string
}

TushLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    babyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stoolFrequency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stoolConsistency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    diaperCondition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    abnormalities: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    additionalNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "tush_logs",
    modelName: "TushLog",
    timestamps: true,
  }
)

export default TushLog
