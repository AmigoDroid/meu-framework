async function traceVlan(vlanId, db) {
  const caminho = [];
  const visitados = new Set();

  const portas = await db.PortaVlans.findAll({
    where: { vlan_id: vlanId }
  });

  const fila = portas.map(p => p.porta_id);

  while (fila.length > 0) {
    const portaId = fila.shift();

    if (visitados.has(portaId)) continue;
    visitados.add(portaId);

    caminho.push({ tipo: "porta", id: portaId });

    const conexoes = await db.ConexoesFisicas.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { porta_a_id: portaId },
          { porta_b_id: portaId }
        ]
      }
    });

    for (const conn of conexoes) {
      const proxima =
        conn.porta_a_id === portaId
          ? conn.porta_b_id
          : conn.porta_a_id;

      if (!visitados.has(proxima)) {
        fila.push(proxima);
      }
    }
  }

  return caminho;
}

module.exports = traceVlan;