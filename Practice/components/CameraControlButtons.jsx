import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

function CameraControlButtons({ onTakePicture, onToggleCameraFacing, onToggleFlashMode, torchEnabled }) {
    return (
        <View style={styles.buttonContainer}>
            <View style={styles.buttonOuterContainer}>
                <Pressable onPress={onToggleCameraFacing} android_ripple={{ color: "#CCC" }}>
                    <View style={styles.cameraReverseContainer}>
                        <Ionicons name="camera-reverse-outline" color={"#EEEFFF"} size={24} />
                    </View>
                </Pressable>
            </View>

            <View style={styles.buttonOuterContainer}>
                <Pressable onPress={onTakePicture} android_ripple={{ color: "#CCC" }}>
                    <View style={styles.buttonInnerContainer} />
                </Pressable>
            </View>

            <View style={styles.buttonOuterContainer}>
                <Pressable onPress={onToggleFlashMode} android_ripple={{ color: "#CCC" }}>
                    <View style={[styles.cameraReverseContainer, torchEnabled === true && { backgroundColor: "#FFF" }]}>
                        <Ionicons name="flash-outline" color={torchEnabled ? "#121212": "#EEEFFF"} size={24} />
                    </View>
                </Pressable>
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    buttonOuterContainer: {
        marginBottom: 40,
        overflow: "hidden",
        borderRadius: 37,
    },


    buttonInnerContainer: {
        width: 75,
        height: 75,
        borderRadius: 37,
        borderWidth: 4,
        borderColor: "#EEEFFF",
        backgroundColor: "transparent",
        overflow: "hidden",
    },

    cameraReverseContainer: {
        padding: 10,
        borderWidth: 3,
        borderColor: "#EEEFFF",
        borderRadius: 9999,
        overflow: "hidden",
    },
});

export default CameraControlButtons;
