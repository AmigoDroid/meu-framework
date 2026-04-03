import { getUser } from "./auth";
import { permissionMap } from "./permissionMap";

export function canAccess(path) {
  const user = getUser();

  // master pode tudo
  if (user?.role === "master") return true;

  const required = permissionMap[path];

  if (!required) return true;

  return user?.permissions?.includes(required);
}