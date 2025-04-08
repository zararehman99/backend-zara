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
  declare sessionDuration: number;
  declare sessionVolume: number;
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
    sessionDuration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sessionVolume: {
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

class SleepLog extends Model {
  declare id: number;
  declare babyId: number;
  declare sleepQuality: string;
  declare durationMins: number;
  declare notes?: string;
}

SleepLog.init(
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
    durationMins: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sleepQuality: {
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
    tableName: "sleep_logs",
    timestamps: true,
  }
);

class Inventory extends Model {
  declare id: number;
  declare item: string;
  declare quantity: number;
  declare category: string;
}

Inventory.init(
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
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Item is required",
        },
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Quantity is required",
        },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category is required",
        },
      },
    },
  },
  {
    sequelize,
    tableName: "inventory",
    timestamps: true,
  }
);

Baby.hasMany(Feed, { foreignKey: "babyId", as: "feeds", onDelete: "CASCADE" });
Feed.belongsTo(Baby, { foreignKey: "babyId", as: "baby" });

Baby.hasMany(PumpSession, {
  foreignKey: "babyId",
  as: "pumpSessions",
  onDelete: "CASCADE",
});
PumpSession.belongsTo(Baby, { foreignKey: "babyId", as: "baby" });

Baby.hasMany(HealthLog, {
  foreignKey: "babyId",
  as: "healthLogs",
  onDelete: "CASCADE",
});
HealthLog.belongsTo(Baby, { foreignKey: "babyId", as: "baby" });

Baby.hasMany(SleepLog, {
  foreignKey: "babyId",
  as: "sleepLogs",
  onDelete: "CASCADE",
});
SleepLog.belongsTo(Baby, { foreignKey: "babyId", as: "baby" });

User.hasMany(Baby, { foreignKey: "userId", as: "babies", onDelete: "CASCADE" });
Baby.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Inventory, { foreignKey: "userId", as: "inventory", onDelete: "CASCADE" });
Inventory.belongsTo(User, { foreignKey: "userId", as: "user"})

export { Baby, Feed, PumpSession, HealthLog, SleepLog, Inventory };
 