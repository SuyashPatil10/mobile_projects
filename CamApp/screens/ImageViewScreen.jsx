import { Image, StyleSheet, View } from "react-native";
import { readExif } from "../utils/ImageDataReader";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";

function ImageViewScreen({ route }) {
    const { asset } = route.params;

    console.log(asset);

    const [assetInfo, setAssetInfo] = useState(null);

    useEffect(() => {
        (async () => {
        // fetch full info (including EXIF) for this asset
        const info = await MediaLibrary.getAssetInfoAsync(asset, { exif: true });
        setAssetInfo(info);
        })();
    }, [asset]);

    if (!assetInfo) {
        console.log("Asset EXIF information is not present"); // or a loading spinner
    }
    else {
        console.log(assetInfo);
    }

//   const { uri, exif } = assetInfo;


    return (
        <View style={styles.container}>
            <Image source={{ uri: asset.uri }} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121221"
    },

    image: {
        width: "100%",
        height: "100%",
        objectFit: "fit",
    },
});

export default ImageViewScreen;
