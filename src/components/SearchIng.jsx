import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchDish.css";

export const SearchBar = ({ setResults, selectedOptions, setSelectedOptions }) => {
  const [input, setInput] = useState("");

  const fetchData = () => {
    fetch("http://localhost:4000/v1/recipes")
      .then((response) => response.json())
      .then((data) => {
       
        const recipes = data.recipes;
  
        if (Array.isArray(recipes)) {
          // Log titles to the console using the provided code snippet
          for (let i = 0; i < recipes.length; i++) {
            console.log(recipes[i].title);
          }
        } else {
          console.error("Recipes property is not an array:", recipes);
          // Handle the error or update the code based on the actual response structure
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the fetch error
      });
  };
  
  
  
  
  
  const handleSelect = (selectedOption) => {
    // Check if the option is already selected
    if (!selectedOptions.includes(selectedOption)) {
      // Add the selected option to the list
      setSelectedOptions([...selectedOptions, selectedOption]);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export const SearchResultsList = ({ results, handleSelect }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <SearchResult
            result={result.name}
            key={id}
            handleSelect={() => handleSelect(result.name)}
          />
        );
      })}
    </div>
  );
};

export const SearchResult = ({ result, handleSelect }) => {
  return (
    <div
      className="search-result"
      onClick={() => handleSelect(result)}
    >
      {result}
    </div>
  );
};

export const SelectedOptionsBox = ({ selectedOptions }) => {
  return (
    <div className="selected-options-box">
      {selectedOptions.map((option, id) => (
        <div key={id} className="selected-option">
          {option}
        </div>
      ))}
    </div>
  );
};
