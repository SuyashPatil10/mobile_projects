import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

function MapsScreen() {
    const [location, setLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [mapViewType, setMapViewType] = useState("standard");

    useEffect(() => {
        async function getLocation() {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if(status !== "granted") {
                setErrorMessage("Permission to access location was denied");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        }

        getLocation();
    }, []);

    function toggleMapViewType(){
        if(mapViewType === "standard")
            setMapViewType("hybrid");
        if(mapViewType === "hybrid")
            setMapViewType("standard");
    }

    if(errorMessage) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>{errorMessage}</Text>
            </View>
        );
    }

    if(!location) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Permission to access location was denied</Text>
            </View>
        );
    }

    const initialRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.message} >
                Location Accessed
            </Text>
            <Text style={styles.messageSmall}>
                {`Latitude : ${ location.coords.latitude } \nLongitude : ${location.coords.longitude}`}
            </Text> */}
            <MapView style={styles.map}
            mapType={mapViewType}
            provider={PROVIDER_GOOGLE}
            initialRegion={initialRegion}
            showsUserLocation
            showsMyLocationButton />

            <Pressable style={styles.buttonContainer}
            onPress={toggleMapViewType}
            android_ripple={{ color: "#CCC" }}>
                <Text style={styles.buttonTitle}>{mapViewType === "standard" ? "Satellite View" : "Standard View"}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121221",
        alignItems: "center",
        justifyContent: "center",
    },

    map: {
        width: "100%",
        height: "100%",
    },

    message: {
        color: "#eb1064",
        fontWeight: "bold",
        fontSize: 24,
    },

    messageSmall: {
        color: "#FFF",
        fontWeight: "semibold",
        fontSize: 18,
    },

    buttonContainer: {
        position: "absolute",
        left: 10,
        top: 5,
        paddingHorizontal: 16,
        paddingVertical: 8,
        zIndex: 10,
        backgroundColor: "#121212",
        borderRadius: 12,
    },

    buttonTitle: {
        color: "#EEEFFF",
        fontWeight: "semibold",
        fontSize: 12,
    },
});

export default MapsScreen;
