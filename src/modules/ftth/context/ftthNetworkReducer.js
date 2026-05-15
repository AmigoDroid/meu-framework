import {
  ftthConnectionTypes,
  ftthElementTypes,
  ftthNetworkInitialState
} from "./ftthNetworkInitialState";

const MAX_HISTORY = 50;

function createId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function snapshot(state) {
  return {
    nodes: state.nodes,
    edges: state.edges,
    draft: state.draft,
    dirty: state.dirty,
    lastSavedAt: state.lastSavedAt
  };
}

function restore(state, previous) {
  return {
    ...state,
    nodes: previous.nodes,
    edges: previous.edges,
    draft: previous.draft,
    dirty: previous.dirty,
    lastSavedAt: previous.lastSavedAt
  };
}

function withHistory(state, nextState) {
  return {
    ...nextState,
    history: [...state.history, snapshot(state)].slice(-MAX_HISTORY),
    future: [],
    dirty: true
  };
}

function selectElement(element) {
  if (!element) return null;

  return {
    id: element.id,
    kind: element.kind,
    collection: element.collection
  };
}

function getNodeCollection(type) {
  const collection = ftthElementTypes[type];
  if (!collection) throw new Error(`Tipo de elemento FTTH invalido: ${type}`);
  return collection;
}

function getEdgeCollection(type) {
  const collection = ftthConnectionTypes[type];
  if (!collection) throw new Error(`Tipo de conexao FTTH invalido: ${type}`);
  return collection;
}

function updateCollection(items, id, patch) {
  return items.map((item) => (
    item.id === id
      ? { ...item, ...patch, updatedAt: new Date().toISOString() }
      : item
  ));
}

function removeElementFromCollection(items, id) {
  return items.filter((item) => item.id !== id);
}

function createLooseTubes(totalTubos = 1, fibrasPorTubo = 12) {
  const tubeCount = Math.max(1, Number(totalTubos) || 1);
  const fiberCount = Math.max(1, Number(fibrasPorTubo) || 12);

  return Array.from({ length: tubeCount }, (_, tubeIndex) => ({
    id: `loose-${tubeIndex + 1}`,
    numero: tubeIndex + 1,
    nome: `Loose ${tubeIndex + 1}`,
    cor: "",
    fibras: Array.from({ length: fiberCount }, (__, fiberIndex) => ({
      id: `loose-${tubeIndex + 1}-fibra-${fiberIndex + 1}`,
      numero: fiberIndex + 1,
      status: "livre",
      cor: ""
    }))
  }));
}

function addNode(state, action) {
  const { type, data = {} } = action.payload;
  const collection = getNodeCollection(type);
  const now = new Date().toISOString();
  const node = {
    id: data.id || createId(type),
    kind: type,
    nome: data.nome || `Novo ${type.toUpperCase()}`,
    status: data.status || "rascunho",
    lat: data.lat ?? null,
    lng: data.lng ?? null,
    metadata: data.metadata || {},
    createdAt: data.createdAt || now,
    updatedAt: data.updatedAt || now
  };

  return withHistory(state, {
    ...state,
    nodes: {
      ...state.nodes,
      [collection]: [...state.nodes[collection], node]
    },
    draft: {
      ...state.draft,
      selected: selectElement({ ...node, collection })
    }
  });
}

function updateNode(state, action) {
  const { type, id, patch } = action.payload;
  const collection = getNodeCollection(type);

  return withHistory(state, {
    ...state,
    nodes: {
      ...state.nodes,
      [collection]: updateCollection(state.nodes[collection], id, patch)
    }
  });
}

function removeNode(state, action) {
  const { type, id } = action.payload;
  const collection = getNodeCollection(type);
  const selected = state.draft.selected;

  return withHistory(state, {
    ...state,
    nodes: {
      ...state.nodes,
      [collection]: removeElementFromCollection(state.nodes[collection], id)
    },
    draft: {
      ...state.draft,
      selected: selected?.id === id ? null : selected
    }
  });
}

function addEdge(state, action) {
  const { type, data = {} } = action.payload;
  const collection = getEdgeCollection(type);
  const now = new Date().toISOString();
  const totalTubos = Math.max(1, Number(data.totalTubos) || 1);
  const fibrasPorTubo = Math.max(1, Number(data.fibrasPorTubo) || 12);
  const cableStructure = type === "cabo"
    ? {
      totalTubos,
      fibrasPorTubo,
      totalFibras: totalTubos * fibrasPorTubo,
      tubosLoose: data.tubosLoose || createLooseTubes(totalTubos, fibrasPorTubo)
    }
    : {};
  const edge = {
    id: data.id || createId(type),
    kind: type,
    nome: data.nome || `Nova ${type.toUpperCase()}`,
    status: data.status || "rascunho",
    origem: data.origem || null,
    destino: data.destino || null,
    coordenadas: data.coordenadas || [],
    metadata: data.metadata || {},
    ...cableStructure,
    createdAt: data.createdAt || now,
    updatedAt: data.updatedAt || now
  };

  return withHistory(state, {
    ...state,
    edges: {
      ...state.edges,
      [collection]: [...state.edges[collection], edge]
    },
    draft: {
      ...state.draft,
      selected: selectElement({ ...edge, collection })
    }
  });
}

function updateEdge(state, action) {
  const { type, id, patch } = action.payload;
  const collection = getEdgeCollection(type);
  const nextPatch = { ...patch };

  if (type === "cabo" && ("totalTubos" in patch || "fibrasPorTubo" in patch)) {
    const currentCable = state.edges[collection].find((item) => item.id === id);
    const totalTubos = Math.max(1, Number(patch.totalTubos ?? currentCable?.totalTubos) || 1);
    const fibrasPorTubo = Math.max(1, Number(patch.fibrasPorTubo ?? currentCable?.fibrasPorTubo) || 12);

    nextPatch.totalTubos = totalTubos;
    nextPatch.fibrasPorTubo = fibrasPorTubo;
    nextPatch.totalFibras = totalTubos * fibrasPorTubo;
    nextPatch.tubosLoose = createLooseTubes(totalTubos, fibrasPorTubo);
  }

  return withHistory(state, {
    ...state,
    edges: {
      ...state.edges,
      [collection]: updateCollection(state.edges[collection], id, nextPatch)
    }
  });
}

function removeEdge(state, action) {
  const { type, id } = action.payload;
  const collection = getEdgeCollection(type);
  const selected = state.draft.selected;

  return withHistory(state, {
    ...state,
    edges: {
      ...state.edges,
      [collection]: removeElementFromCollection(state.edges[collection], id)
    },
    draft: {
      ...state.draft,
      selected: selected?.id === id ? null : selected
    }
  });
}

export function ftthNetworkReducer(state, action) {
  switch (action.type) {
    case "SET_TOOL":
      return {
        ...state,
        draft: {
          ...state.draft,
          tool: typeof action.payload === "string" ? action.payload : action.payload.tool,
          toolKind: typeof action.payload === "string" ? "select" : action.payload.toolKind || "select"
        }
      };

    case "SELECT_ELEMENT":
      return {
        ...state,
        draft: {
          ...state.draft,
          selected: action.payload
        }
      };

    case "CLEAR_SELECTION":
      return {
        ...state,
        draft: {
          ...state.draft,
          selected: null
        }
      };

    case "SET_DRAWING":
      return {
        ...state,
        draft: {
          ...state.draft,
          drawing: action.payload
        }
      };

    case "SET_COLOR_STANDARD":
      return {
        ...state,
        draft: {
          ...state.draft,
          colorStandard: action.payload
        }
      };

    case "SELECT_CABLE_FIBER":
      return {
        ...state,
        draft: {
          ...state.draft,
          cableFiberSelection: action.payload
        }
      };

    case "ADD_NODE":
      return addNode(state, action);

    case "UPDATE_NODE":
      return updateNode(state, action);

    case "REMOVE_NODE":
      return removeNode(state, action);

    case "ADD_EDGE":
      return addEdge(state, action);

    case "UPDATE_EDGE":
      return updateEdge(state, action);

    case "REMOVE_EDGE":
      return removeEdge(state, action);

    case "IMPORT_NETWORK":
      return withHistory(state, {
        ...state,
        nodes: action.payload.nodes || ftthNetworkInitialState.nodes,
        edges: action.payload.edges || ftthNetworkInitialState.edges,
        draft: {
          ...ftthNetworkInitialState.draft,
          ...(action.payload.draft || {})
        }
      });

    case "MARK_SAVED":
      return {
        ...state,
        dirty: false,
        lastSavedAt: action.payload || new Date().toISOString()
      };

    case "RESET_NETWORK":
      return withHistory(state, {
        ...ftthNetworkInitialState,
        history: state.history,
        future: state.future
      });

    case "UNDO": {
      const previous = state.history[state.history.length - 1];
      if (!previous) return state;

      return {
        ...restore(state, previous),
        history: state.history.slice(0, -1),
        future: [snapshot(state), ...state.future]
      };
    }

    case "REDO": {
      const next = state.future[0];
      if (!next) return state;

      return {
        ...restore(state, next),
        history: [...state.history, snapshot(state)].slice(-MAX_HISTORY),
        future: state.future.slice(1)
      };
    }

    default:
      return state;
  }
}
