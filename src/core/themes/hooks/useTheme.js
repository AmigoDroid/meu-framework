export function useTheme() {
  const [theme, setTheme] = useState(themeManager.getCurrentTheme());

  useEffect(() => {
    const unsubscribe = themeManager.onChange(setTheme);
    return unsubscribe;
  }, []);

  return {
    theme,
    applyTheme: themeManager.applyTheme.bind(themeManager),
    getThemes: themeManager.getAvailableThemes.bind(themeManager)
  };
}