import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import RecipeItem from '../components/RecipeItem';
import recipeService from '../services/recipeService';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import ScreenContentWrapper from '../components/ScreenContentWrapper';

function RecipeListScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRecipes = useCallback(async () => {
    console.log("Fetching recipes...");
    setLoading(true);
    setError(null);
    try {
      const data = await recipeService.getRecipes();
      console.log("Recipes fetched:", data.length, "items");
      setRecipes(data);
    } catch (err) {
      console.error("Error loading recipes:", err);
      setError('Failed to load recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('RecipeListScreen focused, refetching recipes...');
      fetchRecipes();
    }, [fetchRecipes])
  );

  const handleDelete = async (id) => {
    try {
      await recipeService.deleteRecipe(id);
      alert('Recipe deleted!');
      fetchRecipes();
    } catch (err) {
      console.error("Error deleting recipe:", err);
      alert('Failed to delete recipe.');
    }
  };

  const handleEdit = (id) => {
    navigation.navigate('AddEditRecipe', { recipeId: id });
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <ScreenContentWrapper style={styles.centered}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading recipes...</Text>
      </ScreenContentWrapper>
    );
  }

  if (error) {
    return (
      <ScreenContentWrapper style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Try Again" onPress={fetchRecipes} color="#28A745" />
      </ScreenContentWrapper>
    );
  }

  return (
    <ScreenContentWrapper scrollable={false}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.topContentContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddEditRecipe')}
          >
            <MaterialIcons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add New Recipe</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </ScrollView>

        {filteredRecipes.length === 0 ? (
          <View style={styles.noRecipesContainer}>
            <MaterialIcons name="local-dining" size={80} color="#CCCCCC" />
            <Text style={styles.noRecipesText}>No recipes found.</Text>
            <Text style={styles.noRecipesSubText}>
              Try adding a new one or clear your search.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <RecipeItem
                recipe={item}
                onPress={() =>
                  navigation.navigate('RecipeDetail', { recipeId: item._id })
                }
                onDelete={() => handleDelete(item._id)}
                onEdit={() => handleEdit(item._id)}
              />
            )}
            contentContainerStyle={styles.listContentContainer}
          />
        )}
      </View>
    </ScreenContentWrapper>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  searchInput: {
    height: 45,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 16,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555555',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  noRecipesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  noRecipesText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#666666',
    marginTop: 15,
    textAlign: 'center',
  },
  noRecipesSubText: {
    fontSize: 16,
    color: '#888888',
    marginTop: 5,
    textAlign: 'center',
  },
  topContentContainer: {
    paddingBottom: 0,
  },
});

export default RecipeListScreen;
