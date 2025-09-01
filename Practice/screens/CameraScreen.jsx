import { Alert, StyleSheet, Text, View } from "react-native";
import CameraControlButtons from "../components/CameraControlButtons";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraView } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
import piexif from "piexifjs";
import * as ImageManipulator from "expo-image-manipulator";

function CameraScreen() {
    let cameraRef = useRef();
    const [hasPermissions, setHasPermissions] = useState(false);
    const [photo, setPhoto] = useState();
    const [facing, setFacing] = useState("back");
    const [isQREnabled, setIsQREnabled] = useState(false);
    const [isTorchEnabled, setIsTorchEnabled] = useState(false);
    const [scannedData, setScannedData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
                const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
                const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

                if (
                    cameraStatus === "granted" &&
                    mediaStatus === "granted" &&
                    locationStatus === "granted"
                ) {
                    setHasPermissions(true);
                } else {
                    Alert.alert("Permissions Denied", "Please grant all permissions to use this feature.");
                    setHasPermissions(false);
                }
            } catch (error) {
                console.error("Permission error:", error);
                Alert.alert("Error", "Failed to request permissions.");
            }
        })();
    }, []);

    function onHandleScannedData({ data }) {
        setScannedData(data);
        setIsQREnabled(false);
        Alert.alert("QR Code Scanned", data, [{ text: "OK" }]);
    }

    function toggleCamera() {
        setFacing((prev) => (prev === "back" ? "front" : "back"));
    }

    function toggleFlashMode() {
        setIsTorchEnabled((prev) => !prev);
    }
    function onToggleQRButton() {
        setIsQREnabled((prev) => !prev);
    }

    async function onTakePicture() {
        if (!cameraRef.current) return;

        try {
            const photo = await cameraRef.current.takePictureAsync({ skipProcessing: true });
            console.log("Photo taken:", photo.uri);

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // ✅ 1. Convert to JPEG using expo-image-manipulator
            const jpegPhoto = await ImageManipulator.manipulateAsync(
                photo.uri,
                [],
                {
                    format: ImageManipulator.SaveFormat.JPEG,
                    compress: 1,
                    base64: true, // ✅ Needed for piexifjs
                }
            );

            // ✅ 2. Create EXIF GPS data
            const gpsExif = {
                [piexif.GPSIFD.GPSLatitudeRef]: latitude >= 0 ? "N" : "S",
                [piexif.GPSIFD.GPSLatitude]: piexif.GPSHelper.degToDmsRational(Math.abs(latitude)),
                [piexif.GPSIFD.GPSLongitudeRef]: longitude >= 0 ? "E" : "W",
                [piexif.GPSIFD.GPSLongitude]: piexif.GPSHelper.degToDmsRational(Math.abs(longitude)),
            };

            const exifObj = { GPS: gpsExif };
            const exifBytes = piexif.dump(exifObj);

            // ✅ 3. Inject EXIF
            const jpegData = "data:image/jpeg;base64," + jpegPhoto.base64;
            const newJpegData = piexif.insert(exifBytes, jpegData);

            // ✅ 4. Save the final JPEG to disk
            const strippedBase64 = newJpegData.replace("data:image/jpeg;base64,", "");
            const newPath = FileSystem.documentDirectory + `photo_with_exif.jpg`;

            await FileSystem.writeAsStringAsync(newPath, strippedBase64, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // ✅ 5. Save to media library
            const asset = await MediaLibrary.createAssetAsync(newPath);
            Alert.alert("Photo saved", "Photo saved with EXIF GPS location");

        } catch (err) {
            console.error("Error taking photo with EXIF:", err);
            Alert.alert("Error", "Failed to take photo with EXIF");
        }
    }


    return (
        <View style={styles.container}>
            <CameraView
            style={{ flex: 1 }}
            ref={cameraRef} 
            facing={facing} 
            mirror={true}
            barcodeScannerSettings={{
                barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={isQREnabled ? onHandleScannedData : undefined}
            enableTorch={isTorchEnabled}
            autofocus="on" 
            />


            <CameraControlButtons
            onTakePicture={onTakePicture}
            onToggleCameraFacing={toggleCamera} 
            onToggleFlashMode={toggleFlashMode} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CameraScreen;