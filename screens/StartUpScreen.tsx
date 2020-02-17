import React,{useState,useEffect} from "react";
import { StyleSheet,ActivityIndicator, Text, View, ScrollView, Image } from "react-native";
import storage from '../services/asyncStorage'
import { inject, observer } from "mobx-react";
import Spinner from '../components/helpers/Spinner'


const StartUpScreen = props => {


    const [getLoading, setLoading] = useState(true),
          {user} = props.store
    

    useEffect(() => {
        const loadData = async () => {
            try {
                await user.fetchAccount()
            } catch{

            } finally {
                await setLoading(false)
            }

        }
        loadData()

    }, [user,setLoading])
    

    if (!getLoading && user.ACCOUNT) {
        setTimeout(function () {
            props.navigation.navigate('Home')
        },100)
    } else if (!getLoading && !user.ACCOUNT) {
        setTimeout(function () {
            props.navigation.navigate('Login')
        }, 100) 
    }


    return <Spinner/>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

export default inject("store")(observer(StartUpScreen));
