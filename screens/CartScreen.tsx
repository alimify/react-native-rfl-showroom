import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button
} from "react-native";




const CartItem = props => {
  return (
    <View>
      <View></View>
      <View>
        <Text>Product Title - Name</Text>
        <View>
          <View>
            <Text>Price</Text>
          </View>
          <View>
            <Text>-</Text>
            <Text>9</Text>
            <Text>+</Text>
          </View>
        </View>
      </View>
    </View>
  );
}








const CartScreen = props => {


  
  return (
    <View>

      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />

    </View>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
