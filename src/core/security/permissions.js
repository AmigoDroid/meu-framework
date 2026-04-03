import { getUser } from "../auth/auth.js";
import { permissionMap } from "./permissionMap";

export function canAccess(path, user = null) {
  // Se não passou usuário, pega do localStorage
  const currentUser = user || getUser();

  // master pode tudo
  if (currentUser?.role === "master") return true;

  const required = permissionMap[path];

  // Se não há permissão requerida para esta rota, permite acesso
  if (!required) return true;

  return currentUser?.permissions?.includes(required);
}