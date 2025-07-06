import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title for the recipe'],
    unique: true,
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  ingredients: {
    type: [String],
    required: [true, 'Please add at least one ingredient']
  },
  instructions: {
    type: [String],
    required: [true, 'Please add at least one instruction step']
  },
  cookingTime: {
    type: Number,
    required: false,
    min: [1, 'Cooking time must be at least 1 minute']
  },
  servings: {
    type: Number,
    required: false,
    min: [1, 'Servings must be at least 1']
  },
  imageUrl: {
    type: String,
    required: false,
    match: [/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/, 'Please use a valid URL for the image'] // Basic URL validation
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
export default Recipe;
