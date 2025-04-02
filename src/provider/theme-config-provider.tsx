import { ReactElement, createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

type Props = {
    children: ReactElement;
};

export function LayoutConfigProvider({ children }: Props) {
    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem('theme') as Theme) || 'light';
    });

    const setThemeState = useCallback((newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
    }, []);

    const matchMode = useCallback(
        (e: MediaQueryListEvent) => {
            setThemeState(e.matches ? 'dark' : 'light');
        },
        [setThemeState],
    );

    useEffect(() => {
        if (!localStorage.getItem('theme')) {
            const mql = window.matchMedia('(prefers-color-scheme: dark)');
            setThemeState(mql.matches ? 'dark' : 'light');
            mql.addEventListener('change', matchMode);
            return () => mql.removeEventListener('change', matchMode);
        }
    }, [matchMode, setThemeState]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
            <div className={` ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}
