import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import storage from '../services/asyncStorage'
import { inject, observer } from "mobx-react";


const StartUpScreen = props => {

    const [getLoading, setLoading] = useState(false),
         {user,common} = props.store
    

    useEffect(() => {
        setLoading(true)
        user.fetchAccount()
        setLoading(false)

        setLoading(true)
        common.fetchGlobals()
        setLoading(false)
    })

    if (user.ACCOUNT) {
        props.navigation.navigate('Home')
    }
    

    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default inject("store")(observer(StartUpScreen));
