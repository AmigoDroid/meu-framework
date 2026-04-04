const fs = require("fs");
const path = require("path");

const schema = require("./models.json");

const OUTPUT_FILE = path.join(__dirname, "models", "initModels.js");

let content = `
module.exports = (db) => {

`;

// belongsTo
schema.models.forEach(model => {
  Object.entries(model.fields).forEach(([field, config]) => {
    if (config.references) {

      const alias = field.replace("_id", "");

      content += `
  db.${model.name}.belongsTo(db.${config.references}, {
    foreignKey: "${field}",
    as: "${alias}"
  });
`;
    }
  });
});

// VLAN many-to-many
content += `
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
`;

content += `
};
`;

fs.writeFileSync(OUTPUT_FILE, content);

console.log("✅ Associations criadas");