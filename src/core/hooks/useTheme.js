import { useFramework } from "./useFramework";

export function useTheme() {
  const { currentTheme, applyTheme } = useFramework();

  return {
    theme: currentTheme,
    setTheme: applyTheme
  };
}