import React,{useEffect,useCallback,useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { withNavigation } from 'react-navigation'
import { inject, observer } from "mobx-react";


import ImageSlider from '../components/product/ImageSlider'
import SelectVariation from '../components/product/SelectVariation'
import DeliveryInformation from '../components/product/DeliveryInformation'
import PaymentMethod from '../components/product/PaymentMethod'
import Reviews from '../components/product/Reviews'
import SimilarProduct from '../components/product/SimilarProduct'

const ProductScreen =   (props) => {
  const product = props.navigation.getParam('product'),
    { shop } = props.store

  
  useEffect(() => {

    shop.fetchProductDetails({
      slug: product.seo_url
    })


   },[shop,product])
  
    return (
      <ScrollView>
        <View>
          <ImageSlider product={shop.PRODUCT_DETAILS} />
          <View>
            <Text style={styles.title}> {product.title} </Text>
          </View>
          <View style={styles.slotContainer}>
            <SelectVariation product={shop.PRODUCT_DETAILS} />
          </View>
          <View style={styles.slotContainer}>
            <DeliveryInformation product={product} />
          </View>
          <View style={styles.slotContainer}>
            <PaymentMethod product={product} />
          </View>
          <View style={styles.slotContainer}>
            <Reviews product={shop.PRODUCT_DETAILS} />
          </View>
          <View style={styles.slotContainer}>
            <SimilarProduct product={shop.PRODUCT_DETAILS} />
          </View>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {

  },
  title: {
    backgroundColor: 'white',
    padding: 10,
    fontSize: 17,
    marginBottom: 10
  },
  slotContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  deliveryContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  }
})

export default inject("store")(observer(withNavigation(ProductScreen)))