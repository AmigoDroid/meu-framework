// src/core/Layout.jsx
import Menu from "./Menu";

export default function Layout({ modules, children }) {
  return (
    <div className="app-shell">
      <Menu modules={modules} />
      <main className="content">
        <div className="bg-shape bg-shape-1" />
        <div className="bg-shape bg-shape-2" />
        <div className="content-inner">{children}</div>
      </main>
    </div>
  );
}
