import { useMemo, useState } from "react";
import { useFramework } from "../../core/hooks/useFramework";
import FtthMap from "./components/FtthMap";
import { useFtthNetwork } from "./context/useFtthNetwork";
import { ftthColorStandards, getFtthColor } from "./services/ftthColorStandards";
import "./FtthPage.css";

const nodeActions = [
  { type: "pop", label: "POP" },
  { type: "dio", label: "DIO" },
  { type: "cto", label: "CTO" },
  { type: "ceo", label: "CEO" },
  { type: "splitter", label: "Splitter" },
  { type: "cliente", label: "Cliente" }
];

const edgeActions = [
  { type: "cabo", label: "Cabo" },
  { type: "fusao", label: "Fusao" },
  { type: "conexao", label: "Conexao" }
];

const statusOptions = ["rascunho", "ativo", "pendente", "rompido", "inativo"];

function getSelectionTarget(selectedElement) {
  if (!selectedElement) return null;

  const isEdge = edgeActions.some((item) => item.type === selectedElement.kind);
  return {
    group: isEdge ? "edge" : "node",
    type: selectedElement.kind,
    id: selectedElement.id
  };
}

function NetworkList({ title, items, emptyText, onSelect, selectedId }) {
  return (
    <div className="ftth-list-block">
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p className="muted">{emptyText}</p>
      ) : (
        <ul className="ftth-list">
          {items.map((item) => (
            <li key={item.id}>
              <button
                className={`ftth-list-button ${selectedId === item.id ? "active" : ""}`}
                type="button"
                onClick={() => onSelect(item)}
              >
                <span>
                  <strong>{item.nome}</strong>
                  <small>{item.kind} | {item.status}</small>
                </span>
                <span className="ftth-item-dot" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function FtthPage() {
  const { request } = useFramework();
  const {
    state,
    summary,
    selectedElement,
    canUndo,
    canRedo,
    setTool,
    updateNode,
    updateEdge,
    removeNode,
    removeEdge,
    selectElement,
    clearSelection,
    setColorStandard,
    selectCableFiber,
    resetNetwork,
    undo,
    redo,
    exportPayload,
    markSaved
  } = useFtthNetwork();

  const [apiStatus, setApiStatus] = useState("");

  const nodes = useMemo(() => Object.values(state.nodes).flat(), [state.nodes]);
  const edges = useMemo(() => Object.values(state.edges).flat(), [state.edges]);
  const selectionTarget = getSelectionTarget(selectedElement);
  const payloadPreview = useMemo(() => JSON.stringify(exportPayload(), null, 2), [exportPayload]);
  const selectedCableFiber = selectedElement?.kind === "cabo" && state.draft.cableFiberSelection?.cableId === selectedElement.id
    ? state.draft.cableFiberSelection
    : {
      cableId: selectedElement?.id,
      tubeNumber: 1,
      fiberNumber: 1
    };

  function handleSelectCableFiber(patch) {
    if (!selectedElement || selectedElement.kind !== "cabo") return;

    const totalTubos = selectedElement.totalTubos || 1;
    const fibrasPorTubo = selectedElement.fibrasPorTubo || 12;
    const tubeNumber = Math.min(totalTubos, Math.max(1, Number(patch.tubeNumber ?? selectedCableFiber.tubeNumber) || 1));
    const fiberNumber = Math.min(fibrasPorTubo, Math.max(1, Number(patch.fiberNumber ?? selectedCableFiber.fiberNumber) || 1));

    selectCableFiber({
      cableId: selectedElement.id,
      tubeNumber,
      fiberNumber
    });
  }

  function handleSelect(item) {
    const collection = Object.entries(state.nodes).find(([, values]) => values.some((value) => value.id === item.id))?.[0]
      || Object.entries(state.edges).find(([, values]) => values.some((value) => value.id === item.id))?.[0];

    selectElement({
      id: item.id,
      kind: item.kind,
      collection
    });
  }

  function handleUpdateSelected(patch) {
    if (!selectionTarget) return;

    if (selectionTarget.group === "node") {
      updateNode(selectionTarget.type, selectionTarget.id, patch);
      return;
    }

    updateEdge(selectionTarget.type, selectionTarget.id, patch);
  }

  function handleRemoveSelected() {
    if (!selectionTarget) return;

    if (selectionTarget.group === "node") {
      removeNode(selectionTarget.type, selectionTarget.id);
      return;
    }

    removeEdge(selectionTarget.type, selectionTarget.id);
  }

  async function handleSaveDraft() {
    const payload = exportPayload();
    setApiStatus("Enviando rascunho para API...");

    try {
      await request("saveFtthNetwork", payload);
      markSaved();
      setApiStatus("Rascunho enviado com sucesso.");
    } catch (error) {
      console.warn("Falha ao enviar FTTH para API", error);
      setApiStatus("Nao foi possivel enviar agora. O payload continua em memoria.");
    }
  }

  return (
    <div className="page ftth-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Visao da rede</p>
          <h1 className="page-title">Memoria temporaria FTTH</h1>
          <p className="page-lead">
            Controle os elementos desenhados no mapa antes de persistir tudo na API.
          </p>
        </div>

        <div className="actions">
          <button className="btn ghost" type="button" onClick={undo} disabled={!canUndo}>Desfazer</button>
          <button className="btn ghost" type="button" onClick={redo} disabled={!canRedo}>Refazer</button>
          <button className="btn primary" type="button" onClick={handleSaveDraft}>Salvar API</button>
        </div>
      </div>

      <div className="stat-grid">
        <div className="card stat-card">
          <span className="pill">Elementos</span>
          <div className="stat-value">{nodes.length}</div>
          <p className="stat-label">POP, DIO, CTO, CEO, splitter e cliente</p>
        </div>
        <div className="card stat-card">
          <span className="pill">Conexoes</span>
          <div className="stat-value">{edges.length}</div>
          <p className="stat-label">Cabos, fusoes e conexoes</p>
        </div>
        <div className="card stat-card">
          <span className="pill">Estado</span>
          <div className="stat-value">{state.dirty ? "Editando" : "Salvo"}</div>
          <p className="stat-label">{state.lastSavedAt ? `Ultimo envio: ${new Date(state.lastSavedAt).toLocaleString()}` : "Ainda nao enviado"}</p>
        </div>
      </div>

      <div className="ftth-workspace">
        <section className="card ftth-panel">
          <div className="card-header">
            <h2>Ferramentas</h2>
            <p className="muted">Crie dados como se fossem eventos do mapa.</p>
          </div>

          <div className="ftth-tool-group">
            <span className="input-label">Elementos de rede</span>
            <div className="chips">
              <button
                className={`chip ftth-chip ${state.draft.toolKind === "select" ? "active" : ""}`}
                type="button"
                onClick={() => setTool("select", "select")}
              >
                Selecionar
              </button>
              {nodeActions.map((item) => (
                <button
                  className={`chip ftth-chip ${state.draft.tool === item.type ? "active" : ""}`}
                  type="button"
                  key={item.type}
                  onClick={() => setTool(item.type, "node")}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ftth-tool-group">
            <span className="input-label">Conexoes fisicas/logicas</span>
            <div className="chips">
              {edgeActions.map((item) => (
                <button
                  className={`chip ftth-chip ${state.draft.tool === item.type ? "active" : ""}`}
                  type="button"
                  key={item.type}
                  onClick={() => setTool(item.type, "edge")}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ftth-summary-grid">
            {Object.entries(summary).map(([key, value]) => (
              <span className="pill" key={key}>{key}: {value}</span>
            ))}
          </div>
        </section>

        <section className="card ftth-map-surface">
          <div className="ftth-map-header">
            <div>
              <h2>Area do mapa</h2>
              <p className="muted">Representacao temporaria ate conectarmos Leaflet/Mapbox.</p>
            </div>
            <span className="badge">{state.draft.tool}</span>
          </div>

          <FtthMap />
        </section>

        <section className="card ftth-panel">
          <div className="card-header">
            <h2>Elemento selecionado</h2>
            <p className="muted">Toda edicao passa pelo contexto FTTH.</p>
          </div>

          {selectedElement ? (
            <div className="form-grid">
              <label>
                <span className="input-label">Nome</span>
                <input
                  className="input-field"
                  value={selectedElement.nome}
                  onChange={(event) => handleUpdateSelected({ nome: event.target.value })}
                />
              </label>

              <label>
                <span className="input-label">Status</span>
                <select
                  className="input-field"
                  value={selectedElement.status}
                  onChange={(event) => handleUpdateSelected({ status: event.target.value })}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </label>

              {selectedElement.kind === "cabo" && (
                <div className="ftth-cable-editor">
                  <div className="ftth-cable-editor-header">
                    <strong>Estrutura do cabo</strong>
                    <span>{selectedElement.totalFibras || 0} fibras</span>
                  </div>

                  <div className="ftth-color-standard">
                    {Object.entries(ftthColorStandards).map(([key, standard]) => (
                      <button
                        className={`ftth-standard-button ${state.draft.colorStandard === key ? "active" : ""}`}
                        type="button"
                        key={key}
                        onClick={() => setColorStandard(key)}
                      >
                        {standard.label}
                      </button>
                    ))}
                  </div>

                  <label>
                    <span className="input-label">Tubos loose</span>
                    <input
                      className="input-field"
                      min="1"
                      type="number"
                      value={selectedElement.totalTubos || 1}
                      onChange={(event) => handleUpdateSelected({ totalTubos: event.target.value })}
                    />
                  </label>

                  <label>
                    <span className="input-label">Fibras por tubo</span>
                    <input
                      className="input-field"
                      min="1"
                      type="number"
                      value={selectedElement.fibrasPorTubo || 12}
                      onChange={(event) => handleUpdateSelected({ fibrasPorTubo: event.target.value })}
                    />
                  </label>

                  <div className="ftth-loose-preview">
                    {(selectedElement.tubosLoose || []).slice(0, 8).map((tubo) => (
                      <button
                        className={`ftth-loose-item ${selectedCableFiber.tubeNumber === tubo.numero ? "active" : ""}`}
                        key={tubo.id}
                        type="button"
                        onClick={() => handleSelectCableFiber({ tubeNumber: tubo.numero })}
                      >
                        <i style={{ background: getFtthColor(state.draft.colorStandard, tubo.numero).hex }} />
                        <strong>Tubo {tubo.numero}</strong>
                        <span>{tubo.fibras.length} fibras</span>
                      </button>
                    ))}
                  </div>

                  <label>
                    <span className="input-label">Fibra do tubo selecionado</span>
                    <select
                      className="input-field"
                      value={selectedCableFiber.fiberNumber}
                      onChange={(event) => handleSelectCableFiber({ fiberNumber: event.target.value })}
                    >
                      {Array.from({ length: selectedElement.fibrasPorTubo || 12 }, (_, index) => {
                        const fiberNumber = index + 1;
                        const fiberColor = getFtthColor(state.draft.colorStandard, fiberNumber);

                        return (
                          <option key={fiberNumber} value={fiberNumber}>
                            Fibra {fiberNumber} - {fiberColor.name}
                          </option>
                        );
                      })}
                    </select>
                  </label>

                  <div className="ftth-fiber-selection-preview">
                    <span style={{ borderColor: getFtthColor(state.draft.colorStandard, selectedCableFiber.tubeNumber).hex }}>
                      Tubo {selectedCableFiber.tubeNumber}: {getFtthColor(state.draft.colorStandard, selectedCableFiber.tubeNumber).name}
                    </span>
                    <span style={{ borderColor: getFtthColor(state.draft.colorStandard, selectedCableFiber.fiberNumber).hex }}>
                      Fibra {selectedCableFiber.fiberNumber}: {getFtthColor(state.draft.colorStandard, selectedCableFiber.fiberNumber).name}
                    </span>
                  </div>
                </div>
              )}

              <div className="ftth-selected-meta">
                <span className="pill">tipo: {selectedElement.kind}</span>
                <span className="pill">id: {selectedElement.id.slice(0, 18)}</span>
              </div>

              <div className="actions">
                <button className="btn ghost" type="button" onClick={clearSelection}>Limpar</button>
                <button className="btn ghost danger" type="button" onClick={handleRemoveSelected}>Remover</button>
              </div>
            </div>
          ) : (
            <p className="muted">Selecione um item na area do mapa ou nas listas.</p>
          )}
        </section>
      </div>

      <div className="panel-grid">
        <section className="card">
          <NetworkList
            title="Elementos em memoria"
            items={nodes}
            emptyText="Nenhum elemento criado."
            selectedId={selectedElement?.id}
            onSelect={handleSelect}
          />
        </section>

        <section className="card">
          <NetworkList
            title="Conexoes em memoria"
            items={edges}
            emptyText="Nenhuma conexao criada."
            selectedId={selectedElement?.id}
            onSelect={handleSelect}
          />
        </section>
      </div>

      <section className="card ftth-payload-card">
        <div className="ftth-map-header">
          <div>
            <h2>Payload para API</h2>
            <p className="muted">Este e o objeto consolidado que pode ser enviado ao backend.</p>
          </div>
          <div className="actions">
            <button className="btn ghost" type="button" onClick={resetNetwork}>Limpar memoria</button>
          </div>
        </div>

        {apiStatus && <p className="input-note">{apiStatus}</p>}
        <pre className="ftth-payload-preview">{payloadPreview}</pre>
      </section>
    </div>
  );
}
