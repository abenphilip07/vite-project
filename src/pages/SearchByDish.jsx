import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const loadOptions = async (inputValue, callback) => {
  try {
    const res = await axios.get(
      `https://recipe-search-88c61755925f.herokuapp.com/v1/recipes${
        inputValue ? `?title=${inputValue}` : ""
      }`
    );
    let data;
    if (res.data.recipes.length) {
      data = res.data.recipes.map((item) => ({
        label: item.title,
        value: item.title,
        id: item.id,
        cook_time: item.cook_time,
        difficulty: item.difficulty,
        cuisine_name: item.cuisine_name,
      }));
    } else {
      data = [];
    }
    callback(data);
  } catch (error) {
    console.error(error);
  }
};

const SearchByDish = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    // Navigate to the recipe page when an option is clicked
    window.location.href = `/recipe/${selectedOption.id}`;
  };

  return (
    <Box p={5}>
      <Box mb={5}>
        <AsyncSelect
          cacheOptions
          defaultOptions={true}
          loadOptions={loadOptions}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default SearchByDish;
