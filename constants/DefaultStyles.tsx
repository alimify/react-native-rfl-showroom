import { StyleSheet} from 'react-native';
import Colors from './Colors'

const styles = StyleSheet.create({
    baseColor4: {
        color: Colors.baseColor4
    },
    bgBaseColor4: {
        backgroundColor: Colors.baseColor4,
        color: Colors.baseColor8
    },
    flatListRow: {
        flexGrow: 1,
        justifyContent: 'space-between',
        flexBasis: '50%',
        flexWrap: 'wrap'
    }
});


export default styles