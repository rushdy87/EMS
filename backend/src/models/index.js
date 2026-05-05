import sequelize from '../config/database.js';
import Unit from './Unit.js';
import JobTitle from './JobTitle.js';

const db = {};

db.sequelize = sequelize;
db.Unit = Unit;
db.JobTitle = JobTitle;

export default db;
