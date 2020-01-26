import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button
} from "react-native";

const HomeScreen = props => {
  return (
    <View>
      <Text>Hello World</Text>
      <Button
        title="Go Category"
        onPress={() => {
          props.navigation.navigate("Category");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
