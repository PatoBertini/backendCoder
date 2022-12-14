const mysql = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "challenge",
  },
};

const sqlite = {
  client: "sqlite3",
  connection: {
    filename: `${__dirname}/DB/ecommerce.sqlite`,
  },
  useNullAsDefault: true,
};

module.exports = { mysql, sqlite };
