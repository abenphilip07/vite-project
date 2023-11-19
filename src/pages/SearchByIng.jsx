import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

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
      <br />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Cook Time</Th>
            <Th>Difficulty</Th>
            <Th>Cuisine</Th>
          </Tr>
        </Thead>
        <Tbody>
          {recipes.map(recipe => (
            <Tr key={recipe.id}>
              <Td>{recipe.title}</Td>
              <Td>{recipe.cook_time}</Td>
              <Td>{recipe.difficulty}</Td>
              <Td>{recipe.cuisine_name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SearchByIng;
