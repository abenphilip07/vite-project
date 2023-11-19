import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const SearchByDish = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/v1/recipes")
      .then((response) => response.json())
      .then((data) => {
        const recipes = data.recipes;
        const newOptions = recipes.map((recipe) => ({
          value: recipe.id,
          label: recipe.title,
          insts: recipe.instructions,
        }));
        setOptions(newOptions);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, []); 

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div>
      <Select options={options} onChange={handleChange} />
      {selectedOption && (
        <div>
          <h2>Instructions</h2>
          <p>{selectedOption.insts}</p>
        </div>
      )}
    </div>
  );
};

export default SearchByDish;
