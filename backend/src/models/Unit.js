import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Unit = sequelize.define(
  'Unit',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'units',
    timestamps: true,
    underscored: true, // Use snake_case for column names
  },
);

export default Unit;
