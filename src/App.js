import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import AppConstants from './constants/app-constants';
import AppContext from './store/app-context';
import AppBody from './components/AppBody';

function App() {
  const [isDarkModeThemeEnabled, setDarkModeTheme] = useState(true);

  const theme = createTheme({
    palette: {
      mode: isDarkModeThemeEnabled
        ? AppConstants.APP_THEME_MODE_DARK
        : AppConstants.APP_THEME_MODE_LIGHT
    }
  });

  const onToggleTheme = () => {
    setDarkModeTheme(!isDarkModeThemeEnabled);
  };

  return (
    <AppContext.Provider value={{ toggleTheme: onToggleTheme }}>
      <ThemeProvider theme={theme}>
        <Paper sx={{ height: '100vh' }}>
          <NavigationBar />
          <AppBody />
        </Paper>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
