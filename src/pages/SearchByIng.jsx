import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const SearchByDish = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/recipes")
      .then((response) => response.json())
      .then((data) => {
        const recipes = data.recipes;
        const newOptions = recipes.map((recipe) => ({
          value: recipe.id,
          label: recipe.title,
        }));
        setOptions(newOptions);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, []); // The empty dependency array ensures the effect runs only once on component mount

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    // Your logic here
  };

  return <Select options={options} onChange={handleChange} isMulti/>;
};

export default SearchByDish;
