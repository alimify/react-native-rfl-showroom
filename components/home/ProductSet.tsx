import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

import ProductDesign from "../helpers/ProductDesign";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import DefaultStyles from '../../constants/DefaultStyles'

const Recommended = props => {
    if (!props.products) {
        return <View></View>;
    }


    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.moreText}>More > </Text>
            </View>
            <View>
                <FlatList
                    data={props.products.slice(0,8)}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({item}) => <ProductDesign product={item} />}
                    columnWrapperStyle={DefaultStyles.flatListRow}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    title: {
        fontWeight: 'bold',

    },
    moreText: {
        fontStyle: 'italic',
        fontWeight: '500',
        color: Colors.baseColor7
    }
});

export default Recommended;
