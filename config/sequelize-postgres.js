require("dotenv").config();

let postgresAppUri = process.env.POSTGRES_APP_URI;

module.exports = {
  app: {
    dialect: "postgres",
    url: postgresAppUri,
    // deefine: {
    //   charset: "UTF8",
    // },
  },
};
