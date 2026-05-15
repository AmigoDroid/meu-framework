import { useCallback, useMemo, useReducer } from "react";
import { buildFtthApiPayload, findFtthElement, summarizeFtthNetwork } from "../services/ftthPayload";
import { FtthNetworkContext } from "./FtthNetworkContext";
import { ftthNetworkInitialState } from "./ftthNetworkInitialState";
import { ftthNetworkReducer } from "./ftthNetworkReducer";

export function FtthNetworkProvider({ children, initialState }) {
  const [state, dispatch] = useReducer(
    ftthNetworkReducer,
    initialState ? { ...ftthNetworkInitialState, ...initialState } : ftthNetworkInitialState
  );

  const setTool = useCallback((tool, toolKind = "select") => {
    dispatch({ type: "SET_TOOL", payload: { tool, toolKind } });
  }, []);

  const selectElement = useCallback((selected) => {
    dispatch({ type: "SELECT_ELEMENT", payload: selected });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: "CLEAR_SELECTION" });
  }, []);

  const setDrawing = useCallback((drawing) => {
    dispatch({ type: "SET_DRAWING", payload: drawing });
  }, []);

  const setColorStandard = useCallback((standard) => {
    dispatch({ type: "SET_COLOR_STANDARD", payload: standard });
  }, []);

  const selectCableFiber = useCallback((selection) => {
    dispatch({ type: "SELECT_CABLE_FIBER", payload: selection });
  }, []);

  const addNode = useCallback((type, data) => {
    dispatch({ type: "ADD_NODE", payload: { type, data } });
  }, []);

  const updateNode = useCallback((type, id, patch) => {
    dispatch({ type: "UPDATE_NODE", payload: { type, id, patch } });
  }, []);

  const removeNode = useCallback((type, id) => {
    dispatch({ type: "REMOVE_NODE", payload: { type, id } });
  }, []);

  const addEdge = useCallback((type, data) => {
    dispatch({ type: "ADD_EDGE", payload: { type, data } });
  }, []);

  const updateEdge = useCallback((type, id, patch) => {
    dispatch({ type: "UPDATE_EDGE", payload: { type, id, patch } });
  }, []);

  const removeEdge = useCallback((type, id) => {
    dispatch({ type: "REMOVE_EDGE", payload: { type, id } });
  }, []);

  const importNetwork = useCallback((network) => {
    dispatch({ type: "IMPORT_NETWORK", payload: network });
  }, []);

  const markSaved = useCallback((savedAt) => {
    dispatch({ type: "MARK_SAVED", payload: savedAt });
  }, []);

  const resetNetwork = useCallback(() => {
    dispatch({ type: "RESET_NETWORK" });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: "UNDO" });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: "REDO" });
  }, []);

  const value = useMemo(() => {
    const selectedElement = findFtthElement(state, state.draft.selected);
    const summary = summarizeFtthNetwork(state);

    return {
      state,
      summary,
      selectedElement,
      canUndo: state.history.length > 0,
      canRedo: state.future.length > 0,
      setTool,
      selectElement,
      clearSelection,
      setDrawing,
      setColorStandard,
      selectCableFiber,
      addNode,
      updateNode,
      removeNode,
      addEdge,
      updateEdge,
      removeEdge,
      importNetwork,
      markSaved,
      resetNetwork,
      undo,
      redo,
      exportPayload: () => buildFtthApiPayload(state)
    };
  }, [
    addEdge,
    addNode,
    clearSelection,
    importNetwork,
    markSaved,
    redo,
    removeEdge,
    removeNode,
    resetNetwork,
    selectElement,
    selectCableFiber,
    setColorStandard,
    setDrawing,
    setTool,
    state,
    undo,
    updateEdge,
    updateNode
  ]);

  return (
    <FtthNetworkContext.Provider value={value}>
      {children}
    </FtthNetworkContext.Provider>
  );
}
