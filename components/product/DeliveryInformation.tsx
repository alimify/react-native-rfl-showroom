import React,{useState} from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Picker } from "react-native";
import { inject, observer } from 'mobx-react'
import { AntDesign } from "@expo/vector-icons";
import Modal from 'react-native-modal'
import {withNavigation} from 'react-navigation'

const DeliveryLocation = props => {


  return (
    <Modal
      isVisible={props.show}
      style={styles.modalContainer}
      onBackdropPress={() => {
        props.setModalShow(false);
      }}
    >
      <View>
        <Text>
          Select delivery location
        </Text>
        <View>

          <View>
            <Text>Division</Text>
            <Picker
              selectedValue={'js'}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) =>
                console.log('mexon')
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>

          <View>
            <Text>District</Text>
            <Picker
              selectedValue={'js'}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) =>
                console.log('mexon')
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>

          <View>
            <Text>Thana</Text>
            <Picker
              selectedValue={'js'}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) =>
                console.log('mexon')
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const DeliverInformation = props => {

  const [getModalShow, setModalShow] = useState(false);


  return (
    <View>

      <TouchableOpacity onPress={() => {
        setModalShow(true)
      }}>
      <View>
        <View style={styles.container}>
          <View>
            <Text style={styles.deliveryText}>Delivery Information</Text>
          </View>
          <View>
            <AntDesign name="right" />
          </View>
        </View>
        <View style={styles.deliveryInfoContainer}>
          <View style={styles.deliveryIcon}>
            <AntDesign name="shoppingcart" />
          </View>
          <Text>This item will shipped from dhaka, it will arrive at feni in 2-3 workdays.</Text>
        </View>
        </View>
      </TouchableOpacity>
      <DeliveryLocation setModalShow={setModalShow} show={getModalShow} product={props.product}/>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between'
  },

  deliveryText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  
  deliveryInfoContainer: {
    padding: 2,
    flex: 1,
    flexDirection: 'row',
  },

  deliveryIcon: {
    marginTop: 5,
    marginRight: 5
  },
  modalContainer: {
    margin: 0,
    backgroundColor: "white",
    height: 300,
    flex: 0,
    bottom: 0,
    position: "absolute",
    width: "100%",
    paddingHorizontal: 10
  },

});

export default inject("store")(observer(withNavigation(DeliverInformation)));

