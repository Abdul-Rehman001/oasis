// hooks/useTheme.ts
"use client";
import { useContext, createContext } from "react";
import { defaultConfig } from "../config/siteConfig";
import { Theme } from "../lib/types/index";

interface ThemeContextProps {
  theme: Theme;
  themeName: string;
  themeType: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultConfig.theme.theme,
  themeName: defaultConfig.theme.themeName,
  themeType: defaultConfig.theme.themeType,
});

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}

export const ThemeProvider = ThemeContext.Provider;
