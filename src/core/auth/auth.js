import { jwtDecode } from "jwt-decode";

export function getUser() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
  // Disparar evento para atualizar componentes
  window.dispatchEvent(new CustomEvent('auth:logout'));
}

export function login(token) {
  localStorage.setItem("token", token);
  // Disparar evento para atualizar componentes
  window.dispatchEvent(new CustomEvent('auth:login'));
}

export function isAuthenticated() {
  return !!getUser();
}