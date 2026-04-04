async function traceFibra(db, clienteId) {

  const caminho = [];

  // 🔎 pega conexão do cliente
  const conexao = await db.ConexaoCliente.findOne({
    where: { },
    include: [
      { model: db.Onus, as: "onu" },
      { model: db.PortasCto, as: "porta_cto" },
      { model: db.Fibras, as: "fibra" }
    ]
  });

  if (!conexao) return [];

  let fibraAtual = conexao.fibra;

  caminho.push({
    tipo: "cliente",
    id: clienteId
  });

  caminho.push({
    tipo: "fibra",
    id: fibraAtual.id
  });

  const visitados = new Set();

  // 🔁 percorre fusões
  while (fibraAtual) {

    if (visitados.has(fibraAtual.id)) break;
    visitados.add(fibraAtual.id);

    // procura fusão
    const fusao = await db.Fusoes.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { fibra_a_id: fibraAtual.id },
          { fibra_b_id: fibraAtual.id }
        ]
      }
    });

    if (!fusao) break;

    const proximaFibraId =
      fusao.fibra_a_id === fibraAtual.id
        ? fusao.fibra_b_id
        : fusao.fibra_a_id;

    caminho.push({
      tipo: "fusao",
      id: fusao.id
    });

    fibraAtual = await db.Fibras.findByPk(proximaFibraId);

    caminho.push({
      tipo: "fibra",
      id: fibraAtual.id
    });
  }

  return caminho;
}

module.exports = traceFibra;