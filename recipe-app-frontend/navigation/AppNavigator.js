import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeListScreen from '../screens/RecipeListScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import AddEditRecipeScreen from '../screens/AddEditRecipeScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="RecipeList">
      <Stack.Screen
        name="RecipeList"
        component={RecipeListScreen}
        options={{ title: 'Recipe List' }}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ title: 'Recipe Details' }}
      />
      <Stack.Screen
        name="AddEditRecipe"
        component={AddEditRecipeScreen}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
