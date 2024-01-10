import React, { ReactNode, useState, createContext } from 'react';
import { Button } from '../Button';
import css from './styles.module.scss';
import seabattleImgLight from '../../../images/seabattle.png';
import seabattleImgDark from '../../../images/seabattleInvert.png';

const themeLight = {
  type: 'light',
  backgroundColor: '#fff',
  fontColor: 'var(--bkg-violet)',
  img: seabattleImgLight,
};

const themeDark = {
  type: 'dark',
  backgroundColor: '#000000',
  fontColor: '#15ccca',
  img: seabattleImgDark,
};

interface Theme {
  type: string;
  backgroundColor: string;
  fontColor: string;
  img: string;
}

interface Themes {
  light: Theme;
  dark: Theme;
}

const themes: Themes = {
  light: themeLight,
  dark: themeDark,
};

export const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme.type === 'dark' ? themes.light : themes.dark);
  };

  return (
    <div
      style={
        {
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.fontColor,
        } as React.CSSProperties
      }>
      <ThemeContext.Provider value={currentTheme}>
        <Button onClick={toggleTheme} type="button" className={css.button}>
          {currentTheme.type === 'light' ? 'Темная тема' : 'Светлая тема'}
        </Button>
        {children}
      </ThemeContext.Provider>
    </div>
  );
};
