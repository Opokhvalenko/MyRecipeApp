import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import recipeService from '../services/recipeService';
import ScreenContentWrapper from '../components/ScreenContentWrapper';

const AddEditRecipeScreen = ({ navigation, route }) => {
  const recipeId = route.params?.recipeId;
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (recipeId) {
      setLoading(true);
      const fetchRecipe = async () => {
        try {
          const recipe = await recipeService.getRecipeById(recipeId);
          setTitle(recipe.title);
          setIngredients(recipe.ingredients.join('\n'));
          setInstructions(recipe.instructions.join('\n'));
          setCookingTime(recipe.cookingTime ? recipe.cookingTime.toString() : '');
          setServings(recipe.servings ? recipe.servings.toString() : '');
          setImageUrl(recipe.imageUrl);
        } catch (error) {
          console.error('Failed to fetch recipe for editing:', error);
          Alert.alert('Error', 'Failed to load recipe data.');
        } finally {
          setLoading(false);
        }
      };
      fetchRecipe();
    }
  }, [recipeId]);

  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Recipe Title is required.');
      return false;
    }
    const ingredientsArray = ingredients.split('\n').filter(item => item.trim() !== '');
    if (ingredientsArray.length === 0) {
      Alert.alert('Validation Error', 'At least one ingredient is required.');
      return false;
    }
    const instructionsArray = instructions.split('\n').filter(item => item.trim() !== '');
    if (instructionsArray.length === 0) {
      Alert.alert('Validation Error', 'At least one instruction step is required.');
      return false;
    }
    if (imageUrl && !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(imageUrl)) {
      Alert.alert('Validation Error', 'Please enter a valid URL for the image.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const ingredientsArray = ingredients.split('\n').map(item => item.trim()).filter(item => item !== '');
    const instructionsArray = instructions.split('\n').map(item => item.trim()).filter(item => item !== '');

    const recipeData = {
      title,
      ingredients: ingredientsArray,
      instructions: instructionsArray,
      cookingTime: cookingTime ? parseInt(cookingTime) : undefined,
      servings: servings ? parseInt(servings) : undefined,
      imageUrl: imageUrl || undefined,
    };

    try {
      if (recipeId) {
        await recipeService.updateRecipe(recipeId, recipeData);
        Alert.alert('Success', 'Recipe updated!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        await recipeService.addRecipe(recipeData);
        Alert.alert('Success', 'Recipe added!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      console.error('Error submitting recipe:', error);
      const errorMessage = error.message || 'Failed to save recipe. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && recipeId) {
    return (
      <ScreenContentWrapper style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading recipe...</Text>
      </ScreenContentWrapper>
    );
  }

  return (
    <ScreenContentWrapper scrollable={true}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Recipe Title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipe title"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Ingredients (each on a new line):</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Salt\nSugar\n..."
          placeholderTextColor="#888"
          value={ingredients}
          onChangeText={setIngredients}
          multiline
        />

        <Text style={styles.label}>Instructions (each step on a new line):</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Step 1\nStep 2\n..."
          placeholderTextColor="#888"
          value={instructions}
          onChangeText={setInstructions}
          multiline
        />

        <Text style={styles.label}>Cooking Time (min):</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 30"
          placeholderTextColor="#888"
          value={cookingTime}
          onChangeText={setCookingTime}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Servings:</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 4"
          placeholderTextColor="#888"
          value={servings}
          onChangeText={setServings}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Image URL (optional):</Text>
        <TextInput
          style={styles.input}
          placeholder="http://example.com/image.jpg (optional)"
          placeholderTextColor="#888"
          value={imageUrl}
          onChangeText={setImageUrl}
          keyboardType="url"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <MaterialIcons name="save" size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>{recipeId ? 'Update Recipe' : 'Add Recipe'}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScreenContentWrapper>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default AddEditRecipeScreen;
