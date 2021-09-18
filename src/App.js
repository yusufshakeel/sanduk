import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper, Grid } from '@mui/material';
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
        <Grid container>
          <Grid item sm={3}>
            <h1>Hello</h1>
          </Grid>
          <Grid item sm={9}>
            <h1>Hello</h1>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
