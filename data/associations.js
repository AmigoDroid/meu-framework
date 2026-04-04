module.exports = (db) => {

  /* ================= POP ================= */

  db.Pops.hasMany(db.Racks, { foreignKey: "pop_id" });
  db.Racks.belongsTo(db.Pops, { foreignKey: "pop_id" });

  db.Racks.hasMany(db.Equipamentos, { foreignKey: "rack_id" });
  db.Equipamentos.belongsTo(db.Racks, { foreignKey: "rack_id" });

  /* ================= EQUIPAMENTOS ================= */

  db.Equipamentos.hasMany(db.Portas, { foreignKey: "equipamento_id" });
  db.Portas.belongsTo(db.Equipamentos, { foreignKey: "equipamento_id" });

  db.Racks.hasMany(db.Dios, { foreignKey: "rack_id" });
  db.Dios.belongsTo(db.Racks, { foreignKey: "rack_id" });

  db.Dios.hasMany(db.PortasDio, { foreignKey: "dio_id" });
  db.PortasDio.belongsTo(db.Dios, { foreignKey: "dio_id" });

  /* ================= VLAN ================= */

  db.Portas.belongsToMany(db.Vlans, {
    through: db.PortaVlans,
    foreignKey: "porta_id"
  });

  db.Vlans.belongsToMany(db.Portas, {
    through: db.PortaVlans,
    foreignKey: "vlan_id"
  });

  /* ================= CONEXÃO PORTA ↔ PORTA ================= */

  db.Portas.hasMany(db.ConexoesFisicas, {
    foreignKey: "porta_a_id",
    as: "conexoes_saida"
  });

  db.Portas.hasMany(db.ConexoesFisicas, {
    foreignKey: "porta_b_id",
    as: "conexoes_entrada"
  });

  /* ================= CABOS / FIBRAS ================= */

  db.Cabos.hasMany(db.Fibras, { foreignKey: "cabo_id" });
  db.Fibras.belongsTo(db.Cabos, { foreignKey: "cabo_id" });

  /* ================= FUSÕES ================= */

  db.Fibras.hasMany(db.Fusoes, {
    foreignKey: "fibra_a_id",
    as: "fusoes_saida"
  });

  db.Fibras.hasMany(db.Fusoes, {
    foreignKey: "fibra_b_id",
    as: "fusoes_entrada"
  });

  /* ================= FIBRA ↔ PORTA ================= */

  db.Portas.hasMany(db.ConexaoFibraPorta, {
    foreignKey: "porta_id"
  });

  db.Fibras.hasMany(db.ConexaoFibraPorta, {
    foreignKey: "fibra_id"
  });

  db.PortasDio.hasMany(db.ConexaoFibraDio, {
    foreignKey: "porta_dio_id"
  });

  db.Fibras.hasMany(db.ConexaoFibraDio, {
    foreignKey: "fibra_id"
  });

  /* ================= CTO ================= */

  db.Ctos.hasMany(db.PortasCto, { foreignKey: "cto_id" });
  db.PortasCto.belongsTo(db.Ctos, { foreignKey: "cto_id" });

  /* ================= SPLITTER ================= */

  db.Splitters.hasMany(db.PortasSplitter, {
    foreignKey: "splitter_id"
  });

  db.PortasSplitter.belongsTo(db.Splitters, {
    foreignKey: "splitter_id"
  });

  db.PortasSplitter.hasMany(db.ConexoesSplitter, {
    foreignKey: "porta_splitter_id"
  });

  db.Fibras.hasMany(db.ConexoesSplitter, {
    foreignKey: "fibra_id"
  });

  /* ================= CLIENTE ================= */

  db.Clientes.hasMany(db.Onus, {
    foreignKey: "cliente_id"
  });

  db.Onus.belongsTo(db.Clientes, {
    foreignKey: "cliente_id"
  });

  db.Onus.hasOne(db.ConexaoCliente, {
    foreignKey: "onu_id"
  });

  db.PortasCto.hasMany(db.ConexaoCliente, {
    foreignKey: "porta_cto_id"
  });

  db.Fibras.hasMany(db.ConexaoCliente, {
    foreignKey: "fibra_id"
  });

};