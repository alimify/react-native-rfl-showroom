import React, { useEffect, useCallback, useState } from "react";
import { inject, observer } from "mobx-react";
import Spinner from "../components/helpers/Spinner";
import DefaultStyles from "../constants/DefaultStyles";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import {
  HeaderButtons,
  HeaderButton,
  Item
} from "react-navigation-header-buttons";

import NavigationService from "../navigation/NavigationService";

const HomeScreen = props => {
  const { showroom, user } = props.store,
    [getLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await showroom.fetchDashboard();
        await user.fetchAccount();
      } catch {
      } finally {
        await setLoading(false);
      }
    };

    loadData();
  }, [showroom, setLoading]);

  if (!getLoading && !user.ACCOUNT) {
    props.navigation.navigate("Login");
  }

  if (getLoading) {
    return <Spinner />;
  }

  return (
    <ScrollView>
      <View>
        <View style={styles.flexItemContainer}>
          <View style={{ ...styles.box, ...{ backgroundColor: "#dd4b39" } }}>
            <Text
              style={{
                ...styles.fontWhite,
                ...DefaultStyles.openSansBold,
                ...styles.numberFont,
                color: "#dd4b39"
              }}
            >
              {showroom.DASHBOARD ? showroom.DASHBOARD.new : 0}
            </Text>
            <Text
              style={{ ...styles.fontWhite, ...DefaultStyles.openSansBold }}
            >
              New
            </Text>
          </View>
          <View style={{ ...styles.box, ...{ backgroundColor: "#f39c12" } }}>
            <Text
              style={{
                ...styles.fontWhite,
                ...DefaultStyles.openSansBold,
                ...styles.numberFont,
                color: "#f39c12"
              }}
            >
              {showroom.DASHBOARD ? showroom.DASHBOARD.processing : 0}
            </Text>
            <Text
              style={{ ...styles.fontWhite, ...DefaultStyles.openSansBold }}
            >
              Processing
            </Text>
          </View>
        </View>

        <View style={styles.flexItemContainer}>
          <View style={{ ...styles.box, ...{ backgroundColor: "#00a65a" } }}>
            <Text
              style={{
                ...styles.fontWhite,
                ...DefaultStyles.openSansBold,
                ...styles.numberFont,
                color: "#00a65a"
              }}
            >
              {showroom.DASHBOARD ? showroom.DASHBOARD.completed : 0}
            </Text>
            <Text
              style={{ ...styles.fontWhite, ...DefaultStyles.openSansBold }}
            >
              Completed
            </Text>
          </View>
          <View style={{ ...styles.box, ...{ backgroundColor: "#00c0ef" } }}>
            <Text
              style={{
                ...styles.fontWhite,
                ...DefaultStyles.openSansBold,
                ...styles.numberFont,
                color: "#00c0ef"
              }}
            >
              {showroom.DASHBOARD ? showroom.DASHBOARD.total : 0}
            </Text>
            <Text
              style={{ ...styles.fontWhite, ...DefaultStyles.openSansBold }}
            >
              Total
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};



const HeaderButtonComponent = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={32}
      color="black"
    />
  );
};

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: () => (
      <Text style={DefaultStyles.headerTitle}>Dashboard</Text>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  box: {
    padding: 30,
    margin: 5,
    alignContent: "space-between",
    width: "47.4%",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4
  },
  flexItemContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  fontWhite: {
    color: "white",
    fontSize: 20
  },
  numberFont: {
    borderRadius: 50,
    backgroundColor: "white",
    height: 45,
    textAlign: "center",
    width: 45,
    lineHeight: 45,
    marginBottom: 4
  }
});

export default inject("store")(observer(HomeScreen));
