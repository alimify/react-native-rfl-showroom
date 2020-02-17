import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Spinner from '../components/helpers/Spinner'
import DefaultStyles from '../constants/DefaultStyles'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";


const HomeScreen = (props) => {

    const { showroom, user } = props.store,
        [getLoading, setLoading] = useState(true),
        shipments = !getLoading && showroom.SHIPMENT_INDEX ? showroom.SHIPMENT_INDEX.shipments.data : [],
        statusTextColor = (status) => {
            switch (status) {
                case 'Processing':
                    return '#f39c12'
                    break;
                case 'Completed':
                    return '#00a65a'
                case 'Placed':
                    return '#dd4b39'
            }
        }

    useEffect(() => {
        const loadData = async () => {
            try {
                await showroom.fetchShipmentIndex({})
                await user.fetchAccount()
            } catch{

            } finally {
                await setLoading(false)
            }

        }

        loadData()

    }, [showroom, setLoading]);

    if (!getLoading && !user.ACCOUNT) {
        props.navigation.navigate('Login')
    }

    if (getLoading) {
        return <Spinner/>
    }

    return (
        <ScrollView>
            {shipments.map((item,key) => {

                return (

                    <View key={key} style={styles.itemsContainer}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('OrderDetail', {
                                id: item.id
                            })
                        }}>
                            <View style={styles.orderDetailsContainer}>
                                <View style={styles.orderDetailItem}>
                                    <Text>Order ID: {item.order_master ? item.order_master.id : ''}</Text>
                                    <Text>Shipment Serial: {item.serial}</Text>
                                    <Text>Total Product: {item.order_details_count}</Text>
                                </View>

                                <View style={styles.orderDetailItem}>
                                    <Text>Delivery Time: <Text>{item.time_frame}</Text></Text>
                                    <Text>Order Date:  <Text>{item.created_at}</Text></Text>
                                    <Text>Status:  <Text style={{ color: statusTextColor(item.status),fontSize:17}}>{item.status}</Text></Text>
                                </View>
                            </View>
                            <View style={styles.orderDetailActionContainer}>
                                <View style={{ ...styles.orderDetailAction, ...{ backgroundColor: '#f39c12', color: 'white', padding: 3, margin: 5, borderRadius: 5 } }}>
                                    <TouchableOpacity onPress={async () => {
                                        await setLoading(true)
                                        await showroom.fetchShipmentStatus({
                                            id: item.id,
                                            status: 'Processing'
                                        })
                                        await showroom.fetchShipmentIndex({})
                                        await setLoading(false)
                                    }}>
                                        <Text style={{ color: 'white' }}>Proccessing</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ ...styles.orderDetailAction, ...{ backgroundColor: '#00a65a', color: 'white', padding: 3, margin: 5, borderRadius: 5 } }}>
                                    <TouchableOpacity onPress={async () => {
                                        await setLoading(true)
                                        await showroom.fetchShipmentStatus({
                                            id: item.id,
                                            status: 'Completed'
                                        })
                                        await showroom.fetchShipmentIndex({})
                                        await setLoading(false)
                                    }}>
                                        <Text style={{ color: 'white' }}>Complete</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>


                )
            })}

        </ScrollView>
    );
};

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: () => <Text style={DefaultStyles.headerTitle}>Orders</Text>
  };
};


const styles = StyleSheet.create({
    itemsContainer: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',

    },
    orderDetailsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        
    },
    orderDetailItem: {
        // paddingHorizontal: 10,
        paddingVertical: 3,
        margin: 1,
        alignContent: 'space-between',
        width: '47.4%',
        justifyContent: 'space-between'
    },
    orderDetailActionContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    orderDetailAction: {
        width: '30%'
    }
});

export default inject("store")(observer(HomeScreen));

