import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

function RenderAlbumItem({ album }) {
    const navigation = useNavigation();

    function onPressMediaItem() {
        navigation.navigate("Images", {
            album,
        })
    }

    return (
        <Pressable style={styles.container} 
        onPress={onPressMediaItem}
        android_ripple={{ color: "#ccc" }}>
            <Text style={styles.title}>{ album.title }</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#343434",
        borderRadius: 8,
        margin: 8,
        backgroundColor: "#343434",
    },

    title: {
        fontWeight: "semibold",
        fontSize: 16,
        color: "#DDD",
    },
});

export default RenderAlbumItem;
