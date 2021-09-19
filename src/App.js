import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper, Grid } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import AppConstants from './constants/app-constants';
import AppContext from './store/app-context';

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
          <Grid container sx={{ pt: 8 }}>
            <Grid item sm={3}>
              <h1>Hello</h1>
            </Grid>
            <Grid item sm={9}>
              <h1>Hello</h1>
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
