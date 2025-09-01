import { StatusBar } from 'expo-status-bar';
import {
    Alert,
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useRef } from 'react';
import MapScreen from './components/MapScreen';

export default function App() {
    const zoomToGeoJSONFuncRef = useRef();

    const mapPressHandler = (coordinates) => {
        Alert.alert(
            'Map press',
            `You pressed at position ${coordinates[0]}/${coordinates[1]}`
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <MapScreen
                onInitialized={(zoomToGeoJSON) =>
                    (zoomToGeoJSONFuncRef.current = zoomToGeoJSON)
                }
                onMapPress={mapPressHandler}
            />
            <Button
                title='Zoom to GeoJSON'
                onPress={() => zoomToGeoJSONFuncRef.current?.()}
            />
            <StatusBar style='auto' />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});