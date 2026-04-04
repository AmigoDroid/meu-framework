const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "postgres",
  logging: false
});

const schema = require("./models.json");

const db = {};

// 🔄 TIPOS
function mapType(type) {
  switch (type) {
    case "INTEGER": return DataTypes.INTEGER;
    case "STRING": return DataTypes.STRING;
    case "TEXT": return DataTypes.TEXT;
    case "FLOAT": return DataTypes.FLOAT;
    case "DATE": return DataTypes.DATE;
    case "BOOLEAN": return DataTypes.BOOLEAN;
    case "JSON": return DataTypes.JSON;
    default: return DataTypes.STRING;
  }
}

// 🚀 MODELS
function createModels() {
  schema.models.forEach(model => {
    const attributes = {};

    Object.entries(model.fields).forEach(([field, config]) => {
      attributes[field] = {
        type: mapType(config.type),
        primaryKey: config.primaryKey || false,
        autoIncrement: config.autoIncrement || false,
        unique: config.unique || false,
        allowNull: config.allowNull !== false
      };

      if (config.references) {
        attributes[field].references = {
          model: config.references,
          key: "id"
        };
      }
    });

    db[model.name] = sequelize.define(model.name, attributes, {
      tableName: model.table,
      timestamps: false
    });
  });
}

// 🔗 RELAÇÕES
function createRelations() {
  schema.models.forEach(model => {
    Object.entries(model.fields).forEach(([field, config]) => {

      if (!config.references) return;

      const source = db[model.name];
      const target = db[config.references];

      // 🔥 alias limpo (remove _id)
      const alias = field.replace("_id", "");

      source.belongsTo(target, {
        foreignKey: field,
        as: alias
      });
    });
  });

  // 🔥 MANY TO MANY (VLAN)
  if (db.Portas && db.Vlans && db.PortaVlans) {
    db.Portas.belongsToMany(db.Vlans, {
      through: db.PortaVlans,
      foreignKey: "porta_id",
      otherKey: "vlan_id"
    });

    db.Vlans.belongsToMany(db.Portas, {
      through: db.PortaVlans,
      foreignKey: "vlan_id",
      otherKey: "porta_id"
    });
  }
}

// 🚀 INIT
async function init() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado");

    createModels();
    createRelations();

    await sequelize.sync({ alter: true });

    console.log("🚀 Tudo pronto");

  } catch (err) {
    console.error("❌ Erro:", err);
  }
}

init();

module.exports = { sequelize, db };