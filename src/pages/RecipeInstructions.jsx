import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Heading, Text, UnorderedList, ListItem, Divider, Image, Flex} from "@chakra-ui/react";

const RecipeInstructions = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(`https://recipe-go.fly.dev/v1/recipes/${id}`);
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
      <Heading mb={4} fontSize="3xl" fontWeight="bold" color="teal.500">
        {recipe.title}
      </Heading>
      <Flex direction={{ base: "column", md: "row" }} align={{ base: "center", md: "flex-start" }}>
        <Box maxW={{ base: "100%", md: "sm" }} overflow="hidden" mb={{ base: 4, md: 0 }}>
          <Image src={imageUrl} alt={recipe.title} w="100%" h="auto" borderRadius="md" />
        </Box>
        <Box ml={{ md: 4 }}>

          <Heading size="lg" mb={2} fontWeight="bold" color="teal.500">
            Ingredients
          </Heading>
          <UnorderedList>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index} fontSize="md" color="gray.700">
                {ingredient.ingredient_name}: {ingredient.quantity} {ingredient.unit}
              </ListItem>
            ))}
          </UnorderedList>

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

          <Heading size="lg" color="red">
            <strong>Instructions:</strong>
          </Heading>
          <Text mb={4} fontSize="lg" color="gray.600">
            {recipe.instructions
              .split('.')
              .filter(instruction => instruction.trim() !== '')
              .map((instruction, index) => (
                <div key={index}>
                  <span>{index + 1}. </span>
                  {instruction.trim()}
                </div>
              ))}
          </Text>

        </Box>
      </Flex>
    </Box>
  );
};

export default RecipeInstructions;