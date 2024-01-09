import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { RefineThemes } from "@refinedev/mui";

type ColorModeContextType = {
  mode: string;
  setMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

const toggleTheme = (isDark: boolean) => {
  let html = document.documentElement;
  html.classList.toggle("dark", isDark);
  let metaTheme = html.querySelector('meta[name=theme-color]') as any;
  if(metaTheme){
    metaTheme.content = getComputedStyle(html).getPropertyValue('--q-bg-nav');
  }
}

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia("(prefers-color-scheme: dark)").matches;
  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(colorModeFromLocalStorage || systemPreference);

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
    toggleTheme(mode === "dark");
  }, [mode]);

  const setColorMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ThemeProvider
        theme={mode === "dark" ? RefineThemes.BlueDark : RefineThemes.Blue}
      >
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
