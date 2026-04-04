const fs = require("fs");
const path = require("path");

const schema = require("./models.json");

const OUTPUT_DIR = path.join(__dirname, "models");

// cria pasta
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

// map types
function mapType(type) {
  return `DataTypes.${type}`;
}

// 🔥 gerar arquivos de models
schema.models.forEach(model => {

  const fields = Object.entries(model.fields).map(([name, config]) => {
    return `    ${name}: {
      type: ${mapType(config.type)},
      ${config.primaryKey ? "primaryKey: true," : ""}
      ${config.autoIncrement ? "autoIncrement: true," : ""}
      allowNull: ${config.allowNull !== false}
    }`;
  }).join(",\n");

  const content = `
module.exports = (sequelize, DataTypes) => {
  const ${model.name} = sequelize.define("${model.name}", {
${fields}
  }, {
    tableName: "${model.table}",
    timestamps: false
  });

  return ${model.name};
};
`;

  fs.writeFileSync(
    path.join(OUTPUT_DIR, `${model.name}.js`),
    content
  );
});

console.log("✅ Models criados");