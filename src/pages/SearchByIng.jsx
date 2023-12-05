import React, { useState } from "react";
import { Link } from "react-router-dom";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { Box, Button, Grid, Image, Text } from "@chakra-ui/react";

const loadOptions = (inputValue, callback) => {
  axios.get("https://recipe-search-88c61755925f.herokuapp.com/v1/listingredients").then((res) => {
    let data;
    if (inputValue) {
      data = res.data.ingredients
        .filter((i) => i.toLowerCase().includes(inputValue.toLowerCase()))
        .map((item) => ({ label: item, value: item }));
    } else {
      data = res.data.ingredients.map((item) => ({ label: item, value: item }));
    }
    callback(data);
  });
};

const SearchByIng = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions); // Update state with selected options

    if (selectedOptions.length === 0) {
      // If no ingredients selected, display a message
      setRecipes([]);
      return;
    }

    const ingredients = selectedOptions.map((option) => option.value).join(",");
    axios
      .get(`https://recipe-search-88c61755925f.herokuapp.com/v1/search?ingredients=${ingredients}`)
      .then((res) => {
        setRecipes(res.data.recipes);
      });
  };

  return (
    <Box p={5}>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        isMulti
        onChange={handleInputChange}
        pb={5}
      />
      <br />
      {selectedOptions.length === 0 ? (
        <Text>No ingredients selected.</Text>
      ) : recipes.length === 0 ? (
        <Text>No matching dishes found.</Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
          {recipes.map((recipe) => (
            <Box key={recipe.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image
                src={`https://f000.backblazeb2.com/file/recipeimagesdbms/${recipe.id}.jpg`}
                alt={recipe.title}
                objectFit="cover"
                height="150px"
              />
              <Box p={4}>
                <strong>{recipe.title}</strong>
                <br />
                <span>Cook Time: {recipe.cook_time}</span>
                <br />
                <span>Cuisine: {recipe.cuisine_name}</span>
                <br />
                <Link to={`/recipe/${recipe.id}`}>
                  <Button colorScheme="teal" size="sm" mt={2}>
                    View Recipe
                  </Button>
                </Link>
              </Box>
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SearchByIng;
