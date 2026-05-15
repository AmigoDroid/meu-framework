export const ftthElementTypes = {
  pop: "pops",
  dio: "dios",
  cto: "ctos",
  ceo: "ceos",
  splitter: "splitters",
  cliente: "clientes"
};

export const ftthConnectionTypes = {
  cabo: "cabos",
  fusao: "fusoes",
  conexao: "conexoes"
};

export const ftthNetworkInitialState = {
  nodes: {
    pops: [],
    dios: [],
    ctos: [],
    ceos: [],
    splitters: [],
    clientes: []
  },
  edges: {
    cabos: [],
    fusoes: [],
    conexoes: []
  },
  draft: {
    tool: "select",
    toolKind: "select",
    selected: null,
    drawing: null,
    colorStandard: "abnt",
    cableFiberSelection: null
  },
  history: [],
  future: [],
  dirty: false,
  lastSavedAt: null
};
