import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const SearchByDish = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let allOptions = [];
      let page = 1;

      try {
        while (true) {
          const url = `http://localhost:4000/v1/recipes?page=${page}`;
          const response = await fetch(url);
          const data = await response.json();

          const recipes = data.recipes;
          const newOptions = recipes.map((recipe) => ({
            value: recipe.id,
            label: recipe.title,
          }));

          allOptions = [...allOptions, ...newOptions];

          console.log(`Fetched page ${page}, recipes count: ${recipes.length}`);

          if (recipes.length === 0) {
            break; // Exit the loop if there are no more recipes
          }

          page++;
        }

        console.log('All pages fetched:', allOptions);
        setOptions(allOptions);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once on component mount

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    // Your logic here
  };

  return <Select options={options} onChange={handleChange} />;
};

export default SearchByDish;
