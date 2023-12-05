import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Heading, Text, UnorderedList, ListItem,Divider } from "@chakra-ui/react";

const RecipeInstructions = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(`https://recipe-search-88c61755925f.herokuapp.com/v1/recipes/${id}`);
      setRecipe(res.data.recipe);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <Box>Loading...</Box>;
  }

  const imageUrl = `https://f000.backblazeb2.com/file/recipeimagesdbms/${recipe.ImageLink}`;

  return (
    <Box p={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box maxW="sm" overflow="hidden" mb={4}>
        <Image src={imageUrl} alt={recipe.title} maxWidth="100%" />
      </Box>
      <Heading mb={4} fontSize="3xl" fontWeight="bold" color="red.500">
        {recipe.title}
      </Heading>
      <Text mb={4} fontSize="lg" color="gray.600">
        {recipe.instructions}
      </Text>
      <Divider mb={4} />
      <Text fontSize="md" color="gray.700">
        <strong>Prep Time:</strong> {recipe.prep_time}
      </Text>
      <Text fontSize="md" color="gray.700">
        <strong>Cook Time:</strong> {recipe.cook_time}
      </Text>
      <Text fontSize="md" color="gray.700">
        <strong>Difficulty:</strong> {recipe.difficulty}
      </Text>
      <Text fontSize="md" color="gray.700">
        <strong>Cuisine:</strong> {recipe.cuisine_name}
      </Text>
      <Divider my={4} />
      <Heading size="lg" mb={2} fontWeight="bold" color="teal.500">Ingredients</Heading>
      <UnorderedList>
        {recipe.ingredients.map((ingredient, index) => (
          <ListItem key={index} fontSize="md" color="gray.700">
            {ingredient.ingredient_name}: {ingredient.quantity}{' '}
            {ingredient.unit}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default RecipeInstructions;