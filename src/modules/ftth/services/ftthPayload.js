export function buildFtthApiPayload(state) {
  return {
    nodes: state.nodes,
    edges: state.edges,
    summary: summarizeFtthNetwork(state),
    draft: state.draft,
    exportedAt: new Date().toISOString(),
    dirty: state.dirty
  };
}

export function summarizeFtthNetwork(state) {
  const totalTubosLoose = state.edges.cabos.reduce((total, cabo) => total + (Number(cabo.totalTubos) || 0), 0);
  const totalFibrasEmCabos = state.edges.cabos.reduce((total, cabo) => total + (Number(cabo.totalFibras) || 0), 0);

  return {
    pops: state.nodes.pops.length,
    dios: state.nodes.dios.length,
    ctos: state.nodes.ctos.length,
    splitters: state.nodes.splitters.length,
    clientes: state.nodes.clientes.length,
    cabos: state.edges.cabos.length,
    tubosLoose: totalTubosLoose,
    fibrasEmCabos: totalFibrasEmCabos,
    fusoes: state.edges.fusoes.length,
    conexoes: state.edges.conexoes.length
  };
}

export function findFtthElement(state, selected) {
  if (!selected?.collection || !selected?.id) return null;

  const source = selected.kind === "cabo" || selected.kind === "fusao" || selected.kind === "conexao"
    ? state.edges
    : state.nodes;

  return source[selected.collection]?.find((item) => item.id === selected.id) || null;
}
