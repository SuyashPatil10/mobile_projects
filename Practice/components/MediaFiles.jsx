import { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import piexif from "piexifjs";
import { convertExifGpsToDecimal } from "../utils/LocationExtractor";

function MediaFiles() {
    const [images, setImages] = useState([]);
    const [selectedExif, setSelectedExif] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== "granted") return;

            // Get latest photo assets
            const media = await MediaLibrary.getAssetsAsync({
                mediaType: "photo",
                first: 10,
                sortBy: ["creationTime"],
            });
            console.log("Media:", media.assets);
            setImages(media.assets);
        })();
    }, []);

    // Function to read EXIF from image
    const readExif = async (uri) => {
        try {
            // Read the image file as base64
            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const jpegData = "data:image/jpeg;base64," + base64;

            // Try to extract EXIF
            const exifData = piexif.load(jpegData);

            if (exifData && Object.keys(exifData).length > 0) {
                setSelectedExif(exifData);
                console.log("EXIF:", exifData);
            } else {
                setSelectedExif("No EXIF found");
            }
        } catch (e) {
            console.error("Error reading EXIF with piexifjs:", e);
            setSelectedExif("Failed to read EXIF");
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item.uri }}
                        style={styles.image}
                        onTouchEnd={() => readExif(item.uri)}
                    />
                )}
            />
            {selectedExif && (
                <View style={styles.exifContainer}>
                    <Text style={styles.exifText}>
                        {typeof selectedExif === "string"
                            ? selectedExif
                            : JSON.stringify(convertExifGpsToDecimal(selectedExif["GPS"]), null, 2)}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
    exifContainer: {
        padding: 10,
        backgroundColor: "#eee",
        marginTop: 10,
    },
    exifText: {
        fontSize: 12,
        fontFamily: "monospace",
    },
});

export default MediaFiles;
