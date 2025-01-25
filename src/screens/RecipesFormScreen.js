import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};
  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [description, setDescription] = useState(
    recipeToEdit ? recipeToEdit.description : ""
  );

  const saverecipe = async () => {
    /* To create the saverecipe function:

Initialize a new recipe: Define a newrecipe object with title, image, and description.

Retrieve existing recipes:

Use AsyncStorage.getItem("customrecipes") to get previously saved recipes from local storage.
Parse the retrieved data into an array (recipes). If no recipes exist, start with an empty array.
Update or add a recipe:

If editing an existing recipe (recipeToEdit is defined), find its index (recipeIndex), update the specific recipe, and save the updated array back to storage.
If adding a new recipe (recipeToEdit is undefined), push the new recipe to the array, and save the updated array back to storage.
Handle callbacks: If editing, call onrecipeEdited() to notify any parent component about the edit.

Navigate back: Once the save is successful, navigate back to the previous screen using navigation.goBack().

Error handling: Wrap everything in a try-catch block to log any errors that occur during the save process.*/
    const newrecipe = { title, image, description };
    try {
      const recipes = JSON.parse(
        (await AsyncStorage.getItem("customrecipes")) || "[]"
      );
      if (recipeToEdit) {
        recipes[recipeIndex] = newrecipe;
      } else {
        recipes.push(newrecipe);
      }
      await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));
      if (onrecipeEdited) {
        onrecipeEdited(newrecipe);
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />
      <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  input: {
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(0.5),
    marginVertical: hp(1),
  },
  image: {
    width: 300,
    height: 200,
    margin: wp(2),
  },
  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(0.5),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
