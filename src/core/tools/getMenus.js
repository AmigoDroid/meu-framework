// src/core/getMenus.js
export function getMenus(modules) {
  return modules
    .filter((m) => m.menu)
    .map((m) => m.menu)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
} 