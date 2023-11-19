import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchByIng from './pages/SearchByIng';
import SearchByDish from './pages/SearchByDish';
import About from './pages/About';
import RecipeInstructions from './pages/RecipeInstructions';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/SearchByIng" element={<SearchByIng />} />
            <Route path="/SearchByDish" element={<SearchByDish />} />
            <Route path="/About" element={<About />} />
            <Route path="/recipe/:id" element={<RecipeInstructions />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
