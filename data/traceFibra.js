async function traceFibra(clienteId, db) {
  const caminho = [];

  // 🔎 pega conexão inicial
  const conexao = await db.ConexaoCliente.findOne({
    where: { },
    include: [
      {
        model: db.Onus,
        where: { cliente_id: clienteId }
      }
    ]
  });

  if (!conexao) return [];

  let fibraAtual = conexao.fibra_id;
  const visitados = new Set();

  while (fibraAtual && !visitados.has(fibraAtual)) {
    visitados.add(fibraAtual);

    const fibra = await db.Fibras.findByPk(fibraAtual);
    caminho.push({ tipo: "fibra", id: fibra.id });

    // 🔁 busca fusão
    const fusao = await db.Fusoes.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { fibra_a_id: fibraAtual },
          { fibra_b_id: fibraAtual }
        ]
      }
    });

    if (fusao) {
      const proximaFibra =
        fusao.fibra_a_id === fibraAtual
          ? fusao.fibra_b_id
          : fusao.fibra_a_id;

      caminho.push({ tipo: "fusao", id: fusao.id });

      fibraAtual = proximaFibra;
      continue;
    }

    // 🔌 conexão com porta (OLT / switch)
    const porta = await db.ConexaoFibraPorta.findOne({
      where: { fibra_id: fibraAtual }
    });

    if (porta) {
      caminho.push({
        tipo: "porta",
        id: porta.porta_id
      });
      break;
    }

    // 🔌 conexão com DIO
    const dio = await db.ConexaoFibraDio.findOne({
      where: { fibra_id: fibraAtual }
    });

    if (dio) {
      caminho.push({
        tipo: "dio",
        id: dio.porta_dio_id
      });
      break;
    }

    break;
  }

  return caminho;
}

module.exports = traceFibra;