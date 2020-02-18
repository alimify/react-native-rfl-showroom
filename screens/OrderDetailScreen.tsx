import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Spinner from '../components/helpers/Spinner'
import DefaultStyles from "../constants/DefaultStyles";

import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity
} from "react-native";

const HomeScreen = (props) => {

    const { showroom,user } = props.store,
        [getLoading, setLoading] = useState(true),
        id = props.navigation.getParam('id'),
        shipment = !getLoading && showroom.SHIPMENT_SHOW ? showroom.SHIPMENT_SHOW : [],
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
                await showroom.fetchShipmentShow({ id: id })
                await user.fetchAccount()
            } catch{

            } finally {
                await setLoading(false)
            }

        }

        loadData()

    }, [showroom, setLoading, id]);
    

    if (!getLoading && !user.ACCOUNT) {
        props.navigation.navigate('Login')
    }


    if (getLoading) {
        return <Spinner/>
    }

    if (!shipment.order || !shipment.shipment) {
        return (<View>
            <Text>Not found..</Text>
        </View>)
    }



    return (
        <ScrollView>
            <View style={{ padding: 6 }}>
                <View style={styles.flexContainer}>
                    <View style={{ ...styles.w45,...{margin:2}}}>
                        <View style={{backgroundColor:'gray',padding:5}}>
                            <Text style={{color:'white',fontSize:15}}>Customer Details</Text>
                        </View>
                        {shipment.order ? (
                            <View>
                                <View style={styles.flexContainer}>
                                    <Text style={styles.w30}>Name: </Text>
                                    <Text style={styles.w65}>{shipment.order.customer_name}</Text>
                                </View>
                                <View style={styles.flexContainer}>
                                    <Text style={styles.w30}>Phone: </Text>
                                    <Text style={styles.w65}>{shipment.order.phone}</Text>
                                </View>

                                <View style={styles.flexContainer}>
                                    <Text style={styles.w30}>Em. Phone: </Text>
                                    <Text style={styles.w65}>{shipment.order.emergency_phone}</Text>
                                </View>
                                <View style={styles.flexContainer}>
                                    <Text style={styles.w25}>Email: </Text>
                                    <Text style={styles.w70}>{shipment.order.email}</Text>
                                </View>

                                <View style={styles.flexContainer}>
                                    <Text style={styles.w35}>Address: </Text>
                                    <Text style={styles.w60}>{shipment.order.address}</Text>
                                </View>

                                <View style={styles.flexContainer}>
                                    <Text style={styles.w35}>Different Address: </Text>
                                    <Text style={styles.w65}>{shipment.order.dba_address}</Text>
                                </View>

                            </View>

                        ) : <Text></Text>}
                      </View>
                    <View style={{ ...styles.w45, ...{ margin: 2 } }}>

                        {shipment.order ? (
                            <View>
                                <View style={{ backgroundColor: 'gray', padding: 5 }}>
                                    <Text style={{ color: 'white', fontSize: 15 }}>Shipment Details</Text>
                                </View>
                                <View>
                                    <View style={styles.flexContainer}>
                                        <Text style={styles.w40}>OrderID: </Text>
                                        <Text style={styles.w60}>{shipment.order.id}</Text>
                                    </View>
                                    <View style={styles.flexContainer}>
                                        <Text style={styles.w40}>Serial: </Text>
                                        <Text style={styles.w60}>{shipment.shipment.serial}</Text>
                                    </View>
                                    <View style={styles.flexContainer}>
                                        <Text style={styles.w40}>Quantity: </Text>
                                        <Text style={styles.w40}>{shipment.shipment.order_details_count}</Text>
                                    </View>
                                </View>
                            </View>

                        ) : <Text></Text>}

                        <View style={{marginTop:8}}>
                            <View style={{ backgroundColor: 'gray', padding: 5 }}>
                                <Text style={{ color: 'white', fontSize: 15 }}>Demand Order Details</Text>
                            </View>
                            <View>
                                <View style={styles.flexContainer}>
                                    <Text style={styles.w35}>Time: </Text>
                                    <Text style={styles.w60}>Abdul Alim</Text>
                                </View>
                                <View style={styles.flexContainer}>
                                    <Text style={styles.w35}>Product SKU: </Text>
                                    <Text style={styles.w60}>regerg , thrt rge, rehgerh</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>

                <View>
                    
                    <View>
                        <View style={{ backgroundColor: 'gray', padding: 5,marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>Shipment {shipment.shipment.serial}</Text>
                        </View>
                        <View style={styles.flexContainer}>

                            <View style={{ ...styles.w30, ...{ backgroundColor: '#f39c12', color: 'white', padding: 3, margin: 5, borderRadius: 5 } }}>
                                <TouchableOpacity onPress={async() => {
                                    await setLoading(true)
                                    await showroom.fetchShipmentStatus({
                                        id: shipment.shipment.id,
                                        status: 'Processing'
                                    })
                                    await setLoading(false)
                                }}>
                                    <Text style={styles.btnFontStyle}>Proccessing</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ ...styles.w30, ...{ backgroundColor: '#00a65a', color: 'white', padding: 3, margin: 5, borderRadius: 5 } }}>
                                <TouchableOpacity onPress={async () => {
                                    await setLoading(true)
                                    await showroom.fetchShipmentStatus({
                                        id: shipment.shipment.id,
                                        status: 'Completed'
                                    })
                                    await setLoading(false)
                                }}>
                                    <Text style={styles.btnFontStyle}>Complete</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View>
                            {shipment.shipment.order_details.map((item,key) => {
                                return (
                                    <View key={key.toString()}>
                                        <View style={styles.flexContainer}>
                                            <View style={{ alignContent: 'center', alignItems: 'center', ...styles.w32 }}>

                                                {
                                                    item.product && item.product.image ? (
                                                        <Image
                                                            style={{ width: 120, height: 160 }}
                                                            source={{ uri: 'https://rflbestbuy.com/secure/' + item.product.image.icon_size_directory  }}
                                                        />
                                                    )
                                                        : (<Text>No image</Text>)
                                        }

                                            </View>

                                            <View style={styles.w65}>
                                                <View style={{ backgroundColor: '#a3a3a3', padding: 5, marginTop: 2 }}>
                                                    <Text style={{ color: 'white', fontSize: 15 }}>Product Information</Text>
                                                </View>
                                                <View style={styles.flexContainer}>
                                                    <Text style={styles.w30}>Title: </Text>
                                                    <Text style={styles.w65}>{item.product_name}</Text>
                                                </View>
                                                <View style={styles.flexContainer}>
                                                    <Text style={styles.w30}>SKU: </Text>
                                                    <Text style={styles.w65}>{item.product.sku}</Text>
                                                </View>
                                                <View style={styles.flexContainer}>
                                                    <Text style={styles.w30}>Code: </Text>
                                                    <Text style={styles.w65}>{item.product_code}</Text>
                                                </View>

                                                <View style={styles.flexContainer}>
                                                    <Text style={styles.w30}>Short Details: </Text>
                                                    <Text style={styles.w65}>{item.product.short_description}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View>

                                            <View style={{ backgroundColor: '#a3a3a3', padding: 5, marginTop: 2 }}>
                                                <Text style={{ color: 'white', fontSize: 15 }}>Order Information</Text>
                                            </View>
                                            <View>
                                                <View style={styles.flexContainer}>
                                                    <View style={styles.flexContainer}>
                                                        <Text style={styles.w40}>Color: </Text>
                                                        <Text style={styles.w48}>{item.color}</Text>
                                                    </View>
                                                    <View style={styles.flexContainer}>
                                                        <Text style={styles.w40}>Size: </Text>
                                                        <Text style={styles.w48}>{item.size}</Text>
                                                    </View>

                                                    <View style={styles.flexContainer}>
                                                        <Text style={styles.w60}>Quantity: </Text>
                                                        <Text style={styles.w35}>{item.qty}</Text>
                                                    </View>

                                                </View>

                                                <View style={styles.flexContainer}>
                                                    <View style={styles.flexContainer}>
                                                        <Text style={styles.w45}>Unit Price: </Text>
                                                        <Text style={styles.w45}>{item.local_purchase_price}</Text>
                                                    </View>
                                                    <View style={styles.flexContainer}>
                                                        <Text style={styles.w30}>Total: </Text>
                                                        <Text style={styles.w65}>{item.local_purchase_price*item.qty}</Text>
                                                    </View>
                                                </View>

                                            </View>

                                        </View>

                                    </View>


                                )
                            })}
                       </View>

                        <View style={{ ...styles.flexContainer,...styles.even}}>
                            <Text style={styles.w45}>Total Products</Text>
                            <Text style={{ ...styles.w45, ...{ textAlign: 'right' } }}>{shipment.order?shipment.order.total_qty:0}</Text>
                        </View>
                        
                        <View style={{ ...styles.flexContainer, ...styles.odd }}>
                            <Text style={styles.w45}>Total Price</Text>
                            <Text style={{ ...styles.w45, ...{ textAlign: 'right' } }}>{shipment.order?shipment.order.total_amount:0}</Text>
                        </View>
                        <View style={{ ...styles.flexContainer, ...styles.even }}>
                            <Text style={styles.w45}>Discount Price</Text>
                            <Text style={{ ...styles.w45, ...{ textAlign: 'right' } }}>{shipment.order?shipment.order.coupon_discount:0}</Text>
                        </View>

                        <View style={{ ...styles.flexContainer, ...styles.odd }}>
                            <Text style={styles.w45}>Delivery Charge ({shipment.order?shipment.order.division:0})</Text>
                            <Text style={{ ...styles.w45, ...{ textAlign: 'right' } }}>{shipment.order?shipment.order.delivery_fee:0}</Text>
                        </View>
                        <View style={{ ...styles.flexContainer, ...styles.even }}>
                            <Text style={styles.w45}>Payment Method</Text>
                            <Text style={{ ...styles.w45, ...{ textAlign: 'right' } }}>{shipment.order?shipment.order.payment_method:''}</Text>
                        </View>
                        <View style={{ ...styles.flexContainer, ...styles.odd }}>
                            <Text style={styles.w45}>Grand Total</Text>
                            <Text style={{ ...styles.w45, ...{ textAlign: 'right' } }}>{shipment.order?shipment.order.grand_total:0}</Text>
                        </View>


                    </View>

                    </View>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    w20: {
        width: '20%'
    },
    w25: {
        width: '25%'
    },
    w30: {
        width: '30%'
    },
    w32: {
        width: '32%'
    },
    w35: {
        width: '35%'
    },
    w40: {
        width: '40%'
    },
    w45: {
        width:'45%'
    },
    w47: {
        width: '47%'
    },
    w48: {
        width: '48%'
    },
    w55: {
        width: '55%'
    },
    w60: {
        width: '60%'
    },
    w65: {
        width: '65%'
    },
    w70: {
        width: '70%'
    },
    even: {
        padding: 5,
        backgroundColor: '#f9f9f9'
    },
    odd: {
        padding: 5,
        backgroundColor: '#ddd'
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



HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: () => <Text style={DefaultStyles.headerTitle}>Order Details</Text>
  };
};



export default inject("store")(observer(HomeScreen));

