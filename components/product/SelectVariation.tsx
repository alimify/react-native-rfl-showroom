import React,{useState} from "react";
import { StyleSheet, Text, View, ScrollView, Image,TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import { set } from "mobx";


const PriceText = props => {
  return !(
    props.product.actual_discount > 0 && props.product.product_price_now > 0
  ) ? (
    <View style={{}}>
      <Text style={styles.priceNow}>$ {props.product.product_price_now}</Text>
    </View>
  ) : (
    <View style={{}}>
      <Text style={styles.priceNow}>$ {props.product.product_price_now}</Text>
      <Text style={styles.regularPrice}>
        $ {props.product.local_selling_price}
      </Text>
    </View>
  );
};


const VariationModal = (props) => {


  const [getQuantity,setQuantity] = useState(1)
  
  return (
    <Modal
      isVisible={props.show}
      style={styles.modalContainer}
      onBackdropPress={() => {
        props.setModalShow(false);
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.modalTitleContainer}>
          <Text>Please select specifications</Text>
          <View>
            <TouchableOpacity onPress={() => props.setModalShow(false)}>
              <Text
                style={{
                  width: 50,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                x
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <PriceText product={props.product} />
          <View>
            <Text>{props.product.stock_status == 1 ? 'In stock':'Out of stock'}</Text>
          </View>
        </View>
        <View>
          <Text>Color & Size</Text>
        </View>
        <View>
          <View>
            <Text>Quantity</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                const quantity = getQuantity - 1;
                setQuantity(quantity);
              }}
            >
              <Text>-</Text>
            </TouchableOpacity>
            <Text>{getQuantity}</Text>

            <TouchableOpacity
              onPress={() => {
                const quantity = getQuantity + 1
                setQuantity(quantity);
              }}
            >
              <Text>+</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>
  );
}

const SelectVariation = props => {

  const [getModalShow, setModalShow] = useState(false)

  return (
    <View>
      <TouchableOpacity onPress={() => setModalShow(!getModalShow)}>
        <View style={styles.container}>
          <View>
            <Text style={styles.variationText}>Select Variation & Qty</Text>
            <View style={styles.priceContainer}>
              <Text>Price: </Text>
              <Text style={styles.priceAmount}> $ {props.product.product.local_selling_price}</Text>
            </View>
          </View>
          <View>
            <AntDesign name="right" />
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <VariationModal show={getModalShow} setModalShow={setModalShow} product={props.product.product} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  variationText: {
    fontSize: 15,
    fontWeight: "bold"
  },
  priceContainer: {
    flex: 1,
    flexDirection: "row"
  },
  priceAmount: {
    color: "gray",
    padding: 2,
    textDecorationLine: "line-through"
  },
  modalContainer: {
    margin: 0,
    backgroundColor: "white",
    height: 250,
    flex: 0,
    bottom: 0,
    position: "absolute",
    width: "100%",
    paddingHorizontal: 10
  },
  modalTitleContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5
  },

  priceNow: {
    color: "red",
    fontSize: 15,
    padding: 2,
    marginRight: 10,
    marginLeft: 5
  },

  regularPrice: {
    color: "gray",
    padding: 2,
    textDecorationLine: "line-through"
  }
});

export default SelectVariation;
