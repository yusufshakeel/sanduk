import React from 'react';

const AppContext = React.createContext({
  isDarkModeEnabled: true,
  toggleTheme: () => {}
});

export default AppContext;
