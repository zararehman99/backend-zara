import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database/initialize-database.config";
import User from "./user.model";

class Baby extends Model {
  declare id: number;
  declare userId: number;
  declare name: string;
  declare age: number;
  declare height: number;
  declare weight: number;
  declare imageBase?: string;
  declare birthDate?: Date;
  declare gender?: string;
}

Baby.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Baby name is required",
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Baby age is required",
        },
      },
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Baby weight is required",
          },
        },
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Baby height is required",
          },
        },
    },
    imageBase: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "babies",
    timestamps: true,
  }
);

class Feed extends Model {
  declare id: number;
  declare babyId: number;
  declare feedTime: Date;
  declare feedType: string;
  declare durationMins?: number;
  declare quantityMl?: number;
  declare notes?: string;
}

Feed.init(
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
      references: {
        model: Baby,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    feedTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    feedType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    durationMins: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantityMl: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "feeds",
    timestamps: true,
  }
);

class PumpSession extends Model {
  declare id: number;
  declare babyId: number;
  declare sessionTime: Date;
  declare durationMins: number;
  declare volumeMl: number;
  declare side?: string;
  declare notes?: string;
}

PumpSession.init(
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
      references: {
        model: Baby,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    sessionTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    durationMins: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    volumeMl: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    side: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "pump_sessions",
    timestamps: true,
  }
);

class HealthLog extends Model {
  declare id: number;
  declare babyId: number;
  declare logDate: Date;
  declare diaperChanges?: number;
  declare temperature?: number;
  declare notes?: string;
}

HealthLog.init(
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
      references: {
        model: Baby,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    logDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    diaperChanges: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    temperature: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "health_logs",
    timestamps: true,
  }
);

Baby.hasMany(Feed, { foreignKey: "babyId", onDelete: "CASCADE" });
Feed.belongsTo(Baby, { foreignKey: "babyId" });

Baby.hasMany(PumpSession, { foreignKey: "babyId", onDelete: "CASCADE" });
PumpSession.belongsTo(Baby, { foreignKey: "babyId" });

Baby.hasMany(HealthLog, { foreignKey: "babyId", onDelete: "CASCADE" });
HealthLog.belongsTo(Baby, { foreignKey: "babyId" });

User.hasMany(Baby, { foreignKey: "userId", onDelete: "CASCADE" });
Baby.belongsTo(User, { foreignKey: "userId" });

export { Baby, Feed, PumpSession, HealthLog };
