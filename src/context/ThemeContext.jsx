import { createContext, useContext, useEffect, useState } from 'react'
const ThemeContext = createContext(null)
export const useTheme = () => useContext(ThemeContext)
const read = () => { try { return localStorage.getItem('theme') || 'dark' } catch { return 'dark' } }
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(read)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* storage blocked */ }
  }, [theme])
  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}
