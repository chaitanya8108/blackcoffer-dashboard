import React, { useState } from 'react';
import { FilterProvider } from './context/FilterContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <Layout />
      </FilterProvider>
    </ThemeProvider>
  );
}

export default App;
