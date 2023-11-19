import React from 'react';
import { useParams } from 'react-router-dom';

const RecipeInstructions = () => {
const { id } = useParams();

  return (
    <div>
      <h1>Recipe Instructions</h1>
      <p>Display instructions for recipe with ID: {id}</p>
    </div>
  );
};

export default RecipeInstructions;
