import React from 'react';
import Providers from './components/dropdowns/ProvidersDropdown';
import Blocks from './components/Blocks';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'

const App = () => {
  return (<ThemeProvider theme={theme}>
    <Providers />
    <Blocks />
  </ThemeProvider>)
}

export default App;
