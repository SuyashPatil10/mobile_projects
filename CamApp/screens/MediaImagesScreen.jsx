import { View, Text, StyleSheet, FlatList } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import RenderAlbumItem from "../components/RenderAlbumItem";

function MediaImagesScreen() {
    const [albums, setAlbums] = useState(null);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    useEffect(() => {
        async function getImageAlbums() {
            if (!permissionResponse) return;
    
            if (permissionResponse.status !== "granted") {
                const res = await requestPermission();
                if (res.status !== "granted") return;
            }
    
            const allAlbums = await MediaLibrary.getAlbumsAsync();
            const imageAlbums = [];
    
            for (const album of allAlbums) {
                const assets = await MediaLibrary.getAssetsAsync({
                    album,
                    mediaType: 'photo',
                    first: 1, // Just check if it has at least one photo
                });
    
                if (assets.totalCount > 0) {
                    imageAlbums.push(album);
                }
            }
    
            setAlbums(imageAlbums);
        }
    
        getImageAlbums();
    }, [permissionResponse]);
    

    return (
        <View style={styles.outerContainer}>
            {
                albums && 
                <FlatList
                data={albums}
                numColumns={2}
                renderItem={(itemData) => {
                    return <RenderAlbumItem album={itemData.item} />
                }}
                keyExtractor={(item) => item.id} />
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        padding: 16,
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 16,
        backgroundColor: "#121212"
    },

    textTitle: {
        color: "#DDD",
    },
});

export default MediaImagesScreen;
