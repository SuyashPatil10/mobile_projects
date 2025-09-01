import { CameraView } from "expo-camera";
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

function CameraBox({ cameraRef, facing, barcodeScannerSettings, onBarcodeScanned, enableTorch, autofocus }) {
    const [hasCameraPermissions, setHasCameraPermissions] = useState();


    useEffect(() => {
        (async () => {
            const cameraPermissions = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermissions(cameraPermissions.status === "granted");
        })();
    },[]);

    if(hasCameraPermissions === undefined) {
        return (
            <View style={styles.container}>
                <Text style={styles.textTitle}>Requesting <Text style={styles.innerTextTitle}>Camera</Text> Permissions!</Text>
            </View>
        );
    }

    if(!hasCameraPermissions) {
        return (
            <View style={styles.container}>
                <Text style={styles.innerTextTitle}>Permissions for Camera are not granted.</Text>
                <Text style={styles.textTitle}>Please try to change it in settings.</Text>
            </View>
        );
    }

    return (
        <CameraView
            style={styles.camera}
            ref={cameraRef} 
            facing={facing} 
            mirror={true}
            barcodeScannerSettings={barcodeScannerSettings}
            onBarcodeScanned={onBarcodeScanned}
            enableTorch={enableTorch}
            autofocus={autofocus} 
        />
    )
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
});

export default CameraBox;
