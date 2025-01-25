import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Updated to handle favorite articles
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    //Now within reducers you need to create the code that toggles an recipe in or out of the favoriterecipes array, adding it if it's not there or removing it if it already exists. It should check if the food from action.payload already exists in the list by comparing idFood. If it exists, the item is removed, and if not, it adds the item to the favorites list.
    toggleFavorite: (state, action) => {
      const existingRecipe = state.favoriterecipes.find(
        (recipe) => recipe.idFood === action.payload.idFood
      );
      if (existingRecipe) {
        state.favoriterecipes = state.favoriterecipes.filter(
          (recipe) => recipe.idFood !== action.payload.idFood
        );
      } else {
        state.favoriterecipes.push(action.payload);
      } // Add or remove the recipe from the list of favorites
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
