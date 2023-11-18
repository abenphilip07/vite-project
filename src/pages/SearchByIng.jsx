import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';

const loadOptions = (inputValue, callback) => {
  axios.get('http://localhost:4000/v1/listingredients')
    .then(res => {
      let data;
      if (inputValue) {
        data = res.data.ingredients
          .filter(i => i.toLowerCase().includes(inputValue.toLowerCase()))
          .map(item => ({ label: item, value: item }));
      } else {
        data = res.data.ingredients.map(item => ({ label: item, value: item }));
      }
      callback(data);
    });
};

const SearchByIng = () => {
  const [recipes, setRecipes] = useState([]);

  const handleInputChange = (selectedOptions) => {
    const ingredients = selectedOptions.map(option => option.value).join(',');
    axios.get(`http://localhost:4000/v1/search?ingredients=${ingredients}`)
      .then(res => {
        setRecipes(res.data.recipes);
      });
  };

  return (
    <Box p={5}>
      <AsyncSelect cacheOptions defaultOptions loadOptions={loadOptions} isMulti onChange={handleInputChange} pb={5} />
      <br></br>
      <SimpleGrid columns={3} spacing={10}>
        {recipes.map(recipe => (
          <Box key={recipe.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box p="6">
              <Text fontWeight="bold" textTransform="uppercase" fontSize="lg" mb={2}>
                {recipe.title}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SearchByIng;