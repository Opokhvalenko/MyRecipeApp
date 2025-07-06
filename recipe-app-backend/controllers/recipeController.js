import Recipe from '../models/Recipe.js';

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
export const getRecipes = async (req, res) => {
  try {
    console.log('Received GET request for /api/recipes');
    const recipes = await Recipe.find();
    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Public
export const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Recipe not found' });
    }
    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    console.error('Error fetching single recipe:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Add new recipe
// @route   POST /api/recipes
// @access  Public
export const addRecipe = async (req, res) => {
  try {
    console.log('Received POST request for /api/recipes with body:', req.body);
    const recipe = await Recipe.create(req.body);
    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    console.error('Error adding recipe:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    } else if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'A recipe with this title already exists.' });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Public
export const updateRecipe = async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Recipe not found' });
    }
    recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    console.error('Error updating recipe:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    } else if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'A recipe with this title already exists.' });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Public
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Recipe not found' });
    }
    await recipe.deleteOne(); // Use deleteOne() for Mongoose 6+
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
