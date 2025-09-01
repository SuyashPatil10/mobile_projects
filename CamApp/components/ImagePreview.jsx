import { SafeAreaView, Image, StyleSheet, View } from "react-native";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";

function ImagePreview({ photo, onPressShare, onPressSave, onPressDiscard, hasMediaLibraryPermissions }) {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: photo.uri }} style={styles.preview} />
            <View style={styles.buttonViewContainer}>
                <Button onPress={onPressShare} title="share">
                    <Ionicons name="share-outline" color={"#FFF"} size={20} />
                </Button>

                { 
                hasMediaLibraryPermissions && 
                <Button onPress={onPressSave} title="save">
                    <Ionicons name="save-outline" color={"#FFF"} size={20} />
                </Button>}
                
                <Button onPress={onPressDiscard} title="discard">
                    <Ionicons name="trash-outline" color={"#FFF"} size={20} />
                </Button>
            </View>
        </SafeAreaView> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#343434",
    },

    preview: {
        alignSelf: "stretch",
        // width: "100%",
        // height: 500,
        flex: 1,
    },

    buttonViewContainer: {
        // position: "absolute",
        display: "flex",
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        justifyContent: "space-evenly",
        margin: 8,
    }
});

export default ImagePreview;
