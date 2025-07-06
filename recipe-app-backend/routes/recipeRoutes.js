import express from 'express';
import {
  getRecipes,
  getRecipe,
  addRecipe,
  updateRecipe,
  deleteRecipe
} from '../controllers/recipeController.js';

const router = express.Router();

router.route('/')
  .get(getRecipes)
  .post(addRecipe);

router.route('/:id')
  .get(getRecipe)
  .put(updateRecipe)
  .delete(deleteRecipe);

export default router;