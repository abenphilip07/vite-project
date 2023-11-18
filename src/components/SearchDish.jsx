import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchDish.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value, setResults) => {
    fetch("http://localhost:4000/v1/recipes")
      .then((response) => response.json())
      .then((data) => {
        const recipes = data.recipes;

        if (Array.isArray(recipes)) {
          const filteredRecipes = recipes.filter((recipe) =>
            recipe.title.toLowerCase().startsWith(value.toLowerCase())
          );

          setResults(filteredRecipes);
        } else {
          console.error("Recipes property is not an array:", recipes);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value, setResults);
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

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result.name} key={id} />;
      })}
    </div>
  );
};

export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  );
};
