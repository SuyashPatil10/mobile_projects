import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { PermissionStatus, launchCameraAsync, useCameraPermissions } from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../utils/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker() {
    const [pickedImage, setPickedImage] = useState(null);
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermission() {
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app.');
            return false;
        }
        
        return true;
    }

    async function takeImageHandler() {
        const hasPermissions = await verifyPermission();
        if(!hasPermissions) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        
        setPickedImage(image.uri);
    }

    let imagePreview = <Text>No image taken yet.</Text>

    if(pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
    }
    return (
        <View>
            <View style={styles.imagePreview}>
                { imagePreview }
            </View>
            <OutlinedButton icon={"camera"} onPress={takeImageHandler}>Take Photo</OutlinedButton>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreview: {
        height: 200,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },

    image: {
        width: "100%",
        height: "100%",
    }
});

export default ImagePicker;
