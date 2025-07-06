import api from '../utils/api';

const recipeService = {
  getRecipes: async () => {
    try {
      const response = await api.get('/recipes');
      return response.data.data;
    } catch (error) {
      console.error('Помилка при отриманні рецептів:', error);
      throw error;
    }
  },

  getRecipeById: async (id) => {
    try {
      const response = await api.get(`/recipes/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Помилка при отриманні рецепту з ID ${id}:`, error);
      throw error;
    }
  },

  addRecipe: async (recipeData) => {
    try {
      const response = await api.post('/recipes', recipeData);
      return response.data;
    } catch (error) {
      console.error('Помилка при додаванні рецепту:', error);
      throw error;
    }
  },

  updateRecipe: async (id, recipeData) => {
    try {
      const response = await api.put(`/recipes/${id}`, recipeData);
      return response.data.data;
    } catch (error) {
      console.error(`Помилка при оновленні рецепту з ID ${id}:`, error);
      throw error;
    }
  },

  deleteRecipe: async (id) => {
    try {
      const response = await api.delete(`/recipes/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Помилка при видаленні рецепту з ID ${id}:`, error);
      throw error;
    }
  },
};

export default recipeService;
