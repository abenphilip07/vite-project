import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";

const RecipeInstructions = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(
        `https://recipe-search-88c61755925f.herokuapp.com/v1/recipes/${id}`
      );
      setRecipe(res.data.recipe);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box p={5}>
      <Heading mb={4}>{recipe.title}</Heading>
      <Text mb={2}>Instructions: {recipe.instructions}</Text>
      <Text mb={2}>Prep time: {recipe.prep_time}</Text>
      <Text mb={2}>Cook time: {recipe.cook_time}</Text>
      <Text mb={2}>Difficulty: {recipe.difficulty}</Text>
      <Text mb={2}>Cuisine: {recipe.cuisine_name}</Text>
      <Heading size="md" mb={2}>
        Ingredients:
      </Heading>
      <UnorderedList>
        {recipe.ingredients.map((ingredient, index) => (
          <ListItem key={index}>
            {ingredient.ingredient_name}: {ingredient.quantity}{" "}
            {ingredient.unit}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default RecipeInstructions;
