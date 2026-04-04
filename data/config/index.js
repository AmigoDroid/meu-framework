const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "postgres"
});

const db = {};

const files = fs.readdirSync(__dirname)
  .filter(f => f !== "index.js" && f !== "initModels.js");

files.forEach(file => {
  const model = require(path.join(__dirname, file));
  const modelInstance = model(sequelize, DataTypes);
  db[modelInstance.name] = modelInstance;
});

// 🔗 associações
require("./initModels")(db);

db.sequelize = sequelize;

module.exports = db;