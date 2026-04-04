async function detectarRompimento(fibraId, db) {
  const clientesAfetados = [];

  const conexoes = await db.ConexaoCliente.findAll();

  for (const conexao of conexoes) {
    const caminho = await require("./traceFibra")(
      conexao.onu_id,
      db
    );

    const afetado = caminho.find(
      item => item.tipo === "fibra" && item.id === fibraId
    );

    if (afetado) {
      clientesAfetados.push(conexao.onu_id);
    }
  }

  return clientesAfetados;
}

module.exports = detectarRompimento;