import app from './app.js';
import env from './config/env.js';
import sequelize from './config/database.js';

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log('Database connected successfully');

    const server = app.listen(env.PORT, () => {
      console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });

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
