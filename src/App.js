import React from 'react';
import Providers from './components/dropdowns/ProvidersDropdown';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'

const App = () => {
  return (<ThemeProvider theme={theme}>
    <Providers />
  </ThemeProvider>)
}

export default App;
