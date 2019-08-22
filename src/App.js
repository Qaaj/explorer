import React from 'react';
import Providers from './components/dropdowns/ProvidersDropdown';
import Blocks from './components/Blocks';
import Cytoscape from './components/cytoscape';

import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'

const App = () => {
  return (<ThemeProvider theme={theme}>
    <Providers />
    <Cytoscape />
    <Blocks />
  </ThemeProvider>)
}

export default App;
