import { DataTypes, Model } from "sequelize";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import validator from "validator";
import { sequelize } from "../config/database/initialize-database.config";
import {
  IUserAttributes,
  IUserCreationAttributes,
  IUserMethods,
} from "../interfaces/user.interface";

class User
  extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserMethods
{
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password?: string;
  declare role: string;
  declare language: string;
  declare refreshToken?: string | null;
  declare threadId?: string | null;

  generateToken(): string {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
      },
      process.env.JWT_SECRET || "JWT_SECRET",
      { expiresIn: "24h" }
    );
  }

  generateRefreshToken(): string {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
      },
      process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET",
      { expiresIn: "7d" }
    );
  }

  async validatePassword(password: string): Promise<boolean> {
    if (!this.password) {
      throw new Error("Password is not set");
    }
    return bcryptjs.compare(password, this.password);
  }
}

// Custom getter to exclude password and refreshToken
User.prototype.toJSON = function () {
  const { password, refreshToken, ...attributes } = this.get() as User;
  return attributes;
};

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name is required",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Email is required",
        },
        isEmailValid(value: string) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid email address");
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required",
        },
        len: {
          args: [6, 50],
          msg: "Password must be between 6 and 50 characters",
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: "en",
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    threadId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

User.beforeCreate(async (user: User) => {
  const salt = await bcryptjs.genSalt(10);
  if (user.password) {
    user.password = await bcryptjs.hash(user.password, salt);
  }
});

export default User;
