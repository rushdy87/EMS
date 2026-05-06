import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Employee = sequelize.define(
  'Employee',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name_ar: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    search_name_ar: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    name_en: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    refinery_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    employee_no: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    job_title_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    unit_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    employment_type: {
      type: DataTypes.ENUM(
        'permanent',
        'contract_315',
        'daily_wage_192',
        'governorate_contract',
      ),
      allowNull: false,
    },

    secondment_from: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    work_location: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    work_schedule: {
      type: DataTypes.ENUM('morning', 'shift'),
      allowNull: false,
    },

    shift: {
      type: DataTypes.ENUM('A', 'B', 'C', 'D'),
      allowNull: true,
    },

    education_level: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    academic_specialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    uniform_size: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    safety_shoe_size: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    hire_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'employees',
    timestamps: true,
    underscored: true,
  },
);

export default Employee;
