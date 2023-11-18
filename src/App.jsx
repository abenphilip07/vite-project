import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchByIng from './pages/SearchByIng';
import SearchByDish from './pages/SearchByDish';
import About from './pages/About';
import { ChakraProvider } from '@chakra-ui/react'
  
 
function App() {
  return (
  <ChakraProvider>
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/SearchByIng" element={<SearchByIng />} />
          <Route path="/SearchByDish" element={<SearchByDish />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
