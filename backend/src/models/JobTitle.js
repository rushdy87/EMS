import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const JobTitle = sequelize.define(
  'JobTitle',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'job_titles',
    timestamps: true,
    underscored: true,
  },
);

export default JobTitle;
