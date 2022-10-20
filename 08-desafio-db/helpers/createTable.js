const mysqlKnex = require("knex")(mysql);
const sqliteKnex = require("knex")(sqlite);
const { mysql, sqlite } = require("../api/servidores");

sqliteKnex.schema.dropTableIfExists("mensajes").finally(() => {
  sqliteKnex.schema
    .createTable("mensajes", (table) => {
      table.increments("id");
      table.string("email").notNullable();
      table.timestamp("send_at").defaultTo(sqliteKnex.fn.now());
      table.string("message").notNullable();
    })
    .then(() => console.log("SQLite3 Tabla Creada"))
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      sqliteKnex.destroy();
    });
});

mysqlKnex.schema.dropTableIfExists("productos").finally(() => {
  mysqlKnex.schema
    .createTable("productos", (table) => {
      table.increments("id");
      table.string("title").notNullable();
      table.float("price").notNullable();
      table.string("thumbnail").notNullable();
    })
    .then(() => console.log("MySQL Tabla Creada"))
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      mysqlKnex.destroy();
    });
});
