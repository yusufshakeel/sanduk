import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import AppConstants from './constants/app-constants';

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
    <ThemeProvider theme={theme}>
      <Paper style={{ height: '100vh' }}>
        <NavigationBar toggleTheme={onToggleTheme} darkModeEnabled={isDarkModeThemeEnabled} />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
