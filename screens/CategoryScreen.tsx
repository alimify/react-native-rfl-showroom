import React,{useEffect} from 'react';
import { inject, observer } from "mobx-react";
import { StyleSheet, Text, View, ScrollView,Image } from 'react-native';


import SiderBarItem from '../components/category/SideBarItem'
import Slot from '../components/category/Slot'

const CategoryScreen = props => {

  const { common } = props.store;

  useEffect(() => {
    common.fetchGlobals()
  })
      
      const megaMenus = common.GLOBALS ? common.GLOBALS.megamenus : [];

    return (
      <View style={styles.container}>
        <ScrollView style={styles.sideBarContainer}>
          {megaMenus.map(item => (
            <SiderBarItem category={item} />
          ))}
        </ScrollView>

        <ScrollView>
          {/* Sub Category Slot */}
          {megaMenus.map(item => (
            <Slot category={item} />
          ))}
        </ScrollView>
      </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap:'wrap',
        // marginBottom: 70,
    },
    sideBarContainer: {
        // padding: 20,
        borderWidth: 1,
    }

})


export default inject("store")(observer(CategoryScreen));