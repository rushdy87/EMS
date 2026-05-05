import app from './app.js';
import env from './config/env.js';
import db from './models/index.js';

const startServer = async () => {
  try {
    await db.sequelize.authenticate();

    console.log('Database connected successfully');

    // await db.sequelize.sync({ alter: true }); // Sync models with the database (use { force: true } to drop and recreate tables)
    await db.sequelize.sync(); // Sync models with the database without altering existing tables

    console.log('Database synced');

    const server = app.listen(env.PORT, () => {
      console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection:', err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (err) {
    console.error('Unable to connect to database:', err.message);
    process.exit(1);
  }
};

startServer();
