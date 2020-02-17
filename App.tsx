import { Provider } from 'mobx-react'
import store from './store'
import React,{useState} from 'react';
import { StyleSheet, Text, View,ScrollView,FlatList } from 'react-native';


import AppNavigator from './navigation/AppNavigator'
import NavigationService from './navigation/NavigationService'

import * as Font from "expo-font";
import { AppLoading } from "expo";
const fetchFonts = () => {
  return Font.loadAsync({
    "squad-one": require("./assets/fonts/squad-one-regular.ttf"),
    Oswald: require("./assets/fonts/Oswald/static/regular.ttf"),
    "open-sans": require("./assets/fonts/Open_Sans/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/Open_Sans/OpenSans-Bold.ttf")
  });
};

export default function App() {
  

    const [getFontLoaded, setFontLoaded] = useState(false);

    if (!getFontLoaded) {
      return (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => {
            setFontLoaded(true);
          }}
        />
      );
    }



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
