import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";


function ImagesScreen({ route, navigation }) {
    const { album } = route.params;
    const [assets, setAssets] = useState(null);

    useEffect(() => {
        async function getAssets() {
            const fetchedAssets = await MediaLibrary.getAssetsAsync({ album });
            setAssets(fetchedAssets.assets);
        }

        getAssets();
    }, [album]);

    // console.log(assets);
    function onPressImageHandler(asset) {
        navigation.navigate("ImageView", {
            asset
        });
    }

    function ImagesGridTemplate(asset) {
        return (
            <Pressable style={styles.imageContainer}
            onPress={() => onPressImageHandler(asset)}>
                <Image source={{ uri: asset.uri }} style={styles.container} />
            </Pressable>
        );
    }

    return (
        <View style={styles.container}>
            {assets && 
            <FlatList 
            data={assets}
            numColumns={3}
            renderItem={(itemData) => { return ImagesGridTemplate(itemData.item) }}
            keyExtractor={(item) => item.id}
            />
            }
            <Text>Asset Images</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        alignItems: "center",
        justifyContent: "center"
    },

    text: {
        color: "white",
    },

    imageContainer: {
        width: 100,
        height: 100,
        margin: 4,
        borderRadius: 4,
        overflow: "hidden",
    },

    image: {
       width: "100%",
       height: "100%", 
    },
});


export default ImagesScreen;
