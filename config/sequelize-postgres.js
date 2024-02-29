require("dotenv").config();

let postgresAppUri = process.env.POSTGRES_APP_URI;

module.exports = {
  app: {
    dialect: "postgres",
    url: postgresAppUri,
    // define: {
    //   charset: "UTF8",
    // },
  },
};
