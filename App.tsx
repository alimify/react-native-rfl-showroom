import { Provider } from 'mobx-react'
import store from './store'
import React from 'react';
import { StyleSheet, Text, View,ScrollView,FlatList } from 'react-native';


import AppNavigator from './navigation/AppNavigator'
import NavigationService from './navigation/NavigationService'

export default function App() {
  
  return (
    <Provider store={store}>
      <AppNavigator
        ref={navigatorRef =>
          NavigationService.setTopLevelNavigator(navigatorRef)
        }
      />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
