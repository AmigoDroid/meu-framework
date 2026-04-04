import { getUser } from "../auth/auth.js";
import { getConfig } from "../config";
import { permissionMap } from "./permissionMap";

export function canAccess(path, user = null) {
  // Se a segurança está desativada, permite todos os acessos
  const config = getConfig();
  if (!config.security?.enablePermissions && !config.security?.enableRoles) {
    return true;
  }

  // Se não passou usuário, pega do localStorage
  const currentUser = user || getUser();

  // master pode tudo
  if (currentUser?.role === "master") return true;

  const required = permissionMap[path];

  // Se não há permissão requerida para esta rota, permite acesso
  if (!required) return true;

  return currentUser?.permissions?.includes(required);
}