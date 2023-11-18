import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const SearchByDish = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/listingredients")
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        const newOptions = data.ingredients.map((ingredient) => ({
          label: ingredient,
          value: ingredient,
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
