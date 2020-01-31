import { inject,observer } from 'mobx-react'
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ProductDesign from '../components/helpers/ProductDesign'

const CategoryProductScreen = (props) => {

    const { shop } = props.store,
        category = props.navigation.getParam('category'),
        [getLoading,setLoading] = useState(false)
    
    useEffect(() => {

        const loadingProduct = async (shop, category) => {
            setLoading(true)
            await shop.fetchSearchProducts({ slug: category.seo_url });
            setLoading(false)
        }

        loadingProduct(shop,category)

    }, [shop, category])
    

    if (getLoading) {
        return (<View>
            <Text>Loading...</Text>
        </View>)
    }
    
    const products = shop.SEARCH_PRODUCTS?shop.SEARCH_PRODUCTS.products.data:[]




    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.productsContainer}>
                    {products.map((item) => <ProductDesign key={item.id} product={item}/>)}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginLeft: 8,
        marginRight: 8
    }
});



export default inject("store")(observer(CategoryProductScreen));
