// src/core/Layout.jsx
import Menu from "./Menu";

export default function Layout({ modules, children }) {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 220 }}>
        <Menu modules={modules} />
      </div>

      <div style={{ flex: 1, padding: 20 }}>
        {children}
      </div>
    </div>
  );
}