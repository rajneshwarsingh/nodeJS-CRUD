export default {
  development: {
    port: process.env.PORTDEV,
    dbConfig: {
      uri: process.env.DB_URI,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  },
  staging: {
    port: process.env.PORT,
    dbConfig: {
      uri: process.env.DB_URI,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  },
};
