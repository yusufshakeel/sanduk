import { useState } from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import AppConstants from './constants/app-constants';
import AppContext from './store/app-context';
import AppBody from './components/AppBody';

function App() {
  const theme = useTheme();
  const [isDarkModeTheme, setDarkModeTheme] = useState(true);

  const createdTheme = createTheme({
    palette: {
      mode: isDarkModeTheme ? AppConstants.APP_THEME_MODE_DARK : AppConstants.APP_THEME_MODE_LIGHT
    }
  });

  const onToggleTheme = () => {
    setDarkModeTheme(!isDarkModeTheme);
  };

  return (
    <AppContext.Provider
      value={{
        toggleTheme: onToggleTheme,
        isDarkModeEnabled: isDarkModeTheme,
        editorStatusBarTheme: {
          dark: theme.palette.primary.dark,
          light: theme.palette.primary.main
        }
      }}
    >
      <ThemeProvider theme={createdTheme}>
        <Paper sx={{ height: '100vh' }}>
          <NavigationBar />
          <AppBody />
        </Paper>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
