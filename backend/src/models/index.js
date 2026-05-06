import sequelize from '../config/database.js';
import Unit from './Unit.js';
import JobTitle from './JobTitle.js';
import Employee from './Employee.js';

const db = {};

db.sequelize = sequelize;
db.Unit = Unit;
db.JobTitle = JobTitle;
db.Employee = Employee;

// Define associations
Unit.hasMany(Employee, {
  foreignKey: 'unit_id',
  as: 'employees',
});

Employee.belongsTo(Unit, {
  foreignKey: 'unit_id',
  as: 'unit',
});

JobTitle.hasMany(Employee, {
  foreignKey: 'job_title_id',
  as: 'employees',
});

Employee.belongsTo(JobTitle, {
  foreignKey: 'job_title_id',
  as: 'jobTitle',
});

export default db;
