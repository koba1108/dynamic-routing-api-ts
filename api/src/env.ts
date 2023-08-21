import pkg from "../package.json";

const ENV = {
  Application: {
    APP_NAME: pkg.name,
    APP_VERSION: pkg.version,
    DOMAIN: process.env.DOMAIN as string,
    ENVIRONMENT: process.env.ENVIRONMENT as string,
    PORT: Number(process.env.PORT),
  },
  Log: {
    FILE: process.env.FILE as string,
    FOLDER: process.env.FOLDER as string,
  },
  Postgres: {
    DATABASE_URL: process.env.DATABASE_URL as string,
  },
  Redis: {
    REDIS_HOST: process.env.REDIS_HOST as string,
    REDIS_PORT: Number(process.env.REDIS_PORT),
  },
};

export default ENV;
