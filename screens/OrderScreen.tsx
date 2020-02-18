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
                                    <Text style={styles.textBold}>
                                        <Text style={styles.textBox}>Order ID: </Text>
                                        <Text style={styles.textBoxRight}>
                                            {item.order_master ? item.order_master.id : ''}
                                        </Text>
                                    </Text>
                                    <Text>
                                        <Text style={styles.textBox}>Order Date: </Text>
                                        <Text style={styles.textBoxRight}>
                                            {item.created_at}
                                        </Text> 
                                    </Text>
                                    <Text>
                                        <Text style={styles.textBox}>Shipment Serial: </Text>
                                        <Text style={styles.textBoxRight}>
                                             {item.serial}
                                        </Text>
                                    </Text>
                                    <Text>
                                        <Text style={styles.textBox}>Total Product: </Text>
                                        <Text style={styles.textBoxRight}>
                                            {item.order_details_count}
                                        </Text> 
                                    </Text>

                                    <Text>
                                        <Text style={styles.textBox}>Delivery Time: </Text>
                                        <Text style={styles.textBoxRight}>
                                            {item.time_frame}
                                        </Text> 
                                    </Text>                                    
                                    <Text>
                                        <Text style={styles.textBox}>Status: </Text>
                                        <Text style={{ color: statusTextColor(item.status),fontSize:17}}>
                                            {item.status}
                                        </Text>
                                    </Text>
                                </View>


                                <View style={styles.orderDetailItem}>
                                    <View style={styles.orderDetailActionContainer}>
                                        <View style={{ ...styles.orderDetailAction, ...{ backgroundColor: '#f39c12', color: 'white', padding: 0, marginRight: 5, borderRadius: 3 } }}>
                                            <TouchableOpacity onPress={async () => {
                                                await setLoading(true)
                                                await showroom.fetchShipmentStatus({
                                                    id: item.id,
                                                    status: 'Processing'
                                                })
                                                await showroom.fetchShipmentIndex({})
                                                await setLoading(false)
                                            }}>
                                                <Text style={styles.btnFontStyle}>Proccessing</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ ...styles.orderDetailAction, ...{ backgroundColor: '#00a65a', color: 'white', padding: 0, marginRight: 5, borderRadius: 3 } }}>
                                            <TouchableOpacity onPress={async () => {
                                                await setLoading(true)
                                                await showroom.fetchShipmentStatus({
                                                    id: item.id,
                                                    status: 'Completed'
                                                })
                                                await showroom.fetchShipmentIndex({})
                                                await setLoading(false)
                                            }}>
                                                <Text style={styles.btnFontStyle}>Complete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
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
        paddingHorizontal: 15,
        justifyContent: 'center',
        // borderBottomWidth: 3,
        // borderBottomColor: '#DEDEDE',

    },
    orderDetailsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
        marginBottom: -12,
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: '#e6e6e6',
        alignItems: 'center',
        borderColor: '#bfbfbf',
        borderWidth: 1
        
    },
    orderDetailItem: {
        paddingTop: 0,
        paddingBottom: 0,
        margin: 1,
        alignContent: 'space-between',
        width: '100%',
        justifyContent: 'space-between',        
    },
    orderDetailItemM: {
        paddingVertical: 3,
        margin: 1,
        alignContent: 'space-between',
        justifyContent: 'space-between'
    },
    orderDetailActionContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    orderDetailAction: {
        width: '30%',
        
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 18,
        color: '#555555'        
    },
    btnFontStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 5,
        fontSize: 17
    },
    textBox: {
        color: '#404040',
        fontWeight: 'bold',
        paddingVertical: 5,
        fontSize: 17
    },
    textBoxRight: {
        color: '#000000',
        fontSize: 17
    }
});

export default inject("store")(observer(HomeScreen));

