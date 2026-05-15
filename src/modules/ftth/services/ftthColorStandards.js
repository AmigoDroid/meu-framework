export const ftthColorStandards = {
  abnt: {
    label: "ABNT",
    colors: [
      { name: "Verde", hex: "#16a34a" },
      { name: "Amarelo", hex: "#eab308" },
      { name: "Branco", hex: "#f8fafc" },
      { name: "Azul", hex: "#2563eb" },
      { name: "Vermelho", hex: "#dc2626" },
      { name: "Violeta", hex: "#7c3aed" },
      { name: "Marrom", hex: "#92400e" },
      { name: "Rosa", hex: "#ec4899" },
      { name: "Preto", hex: "#111827" },
      { name: "Cinza", hex: "#64748b" },
      { name: "Laranja", hex: "#f97316" },
      { name: "Agua-marinha", hex: "#06b6d4" }
    ]
  },
  tia: {
    label: "TIA",
    colors: [
      { name: "Blue", hex: "#2563eb" },
      { name: "Orange", hex: "#f97316" },
      { name: "Green", hex: "#16a34a" },
      { name: "Brown", hex: "#92400e" },
      { name: "Slate", hex: "#64748b" },
      { name: "White", hex: "#f8fafc" },
      { name: "Red", hex: "#dc2626" },
      { name: "Black", hex: "#111827" },
      { name: "Yellow", hex: "#eab308" },
      { name: "Violet", hex: "#7c3aed" },
      { name: "Rose", hex: "#ec4899" },
      { name: "Aqua", hex: "#06b6d4" }
    ]
  }
};

export function getFtthColor(standardKey, number) {
  const standard = ftthColorStandards[standardKey] || ftthColorStandards.abnt;
  const index = Math.max(0, Number(number || 1) - 1) % standard.colors.length;

  return standard.colors[index];
}

export function getCableSelectionColors(state, cable) {
  if (!cable || cable.kind !== "cabo") return null;

  const selection = state.draft.cableFiberSelection;
  if (selection?.cableId !== cable.id) return null;

  return {
    tube: getFtthColor(state.draft.colorStandard, selection.tubeNumber),
    fiber: getFtthColor(state.draft.colorStandard, selection.fiberNumber),
    tubeNumber: selection.tubeNumber,
    fiberNumber: selection.fiberNumber,
    standard: state.draft.colorStandard
  };
}
