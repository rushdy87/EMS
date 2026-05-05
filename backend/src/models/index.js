import sequelize from '../config/database.js';
import Unit from './Unit.js';

const db = {};

db.sequelize = sequelize;
db.Unit = Unit;

export default db;
