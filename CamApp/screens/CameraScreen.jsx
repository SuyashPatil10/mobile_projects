import { useEffect, useRef, useState } from "react";
import { View, StyleSheet} from "react-native";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';
import piexif from 'piexifjs';


import ImagePreview from "../components/ImagePreview";
import TextButton from "../components/TextButton";
import Camera from "../components/Camera/CameraBox";
import CameraControlButtons from "../components/Camera/CameraControlButtons";
import QRBox from "../components/Camera/QRBox";
import { toDMS } from "../utils/LocationConverter";

function CameraScreen() {
    let cameraRef = useRef();
    const [hasMediaLibraryPermissions, setHasMediaLibraryPermissions] = useState();
    const [photo, setPhoto] = useState();
    const [facing, setFacing] = useState("back");
    const [isQREnabled, setIsQREnabled] = useState(false);
    const [isTorchEnabled, setIsTorchEnabled] = useState(false);
    const [scannedData, setScannedData] = useState(null);

    useEffect(() => {
        (async () => {
            const mediaLiraryPermissions = await MediaLibrary.requestPermissionsAsync();
            setHasMediaLibraryPermissions(mediaLiraryPermissions.status === "granted");
        })();
    },[]);

    function onHandleScannedData({ data }) {
        console.log(data);
        setScannedData(data);
        setIsQREnabled(false);
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    function toggleFlashMode() {
        setIsTorchEnabled((current) => current ? false : true);
    }

    function onToggleQRButton() {
        setIsQREnabled((isQREnabled) => !isQREnabled);
    }

    async function takePic() {
        const options = {
            quality: 1,
            base64: true,
            exif: true,
        };
    
        const newPhoto = await cameraRef.current.takePictureAsync(options);
    
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.warn('Location permission not granted');
            setPhoto(newPhoto);
            return;
        }
    
        const location = await Location.getCurrentPositionAsync({});
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
    
        const jpegData = "data:image/jpeg;base64," + newPhoto.base64;
    
        const latRef = latitude >= 0 ? "N" : "S";
        const lngRef = longitude >= 0 ? "E" : "W";
    
        const gpsExif = {
            [piexif.GPSIFD.GPSLatitudeRef]: latRef,
            [piexif.GPSIFD.GPSLatitude]: toDMS(Math.abs(latitude)),
            [piexif.GPSIFD.GPSLongitudeRef]: lngRef,
            [piexif.GPSIFD.GPSLongitude]: toDMS(Math.abs(longitude)),
        };
    
        const exifObj = { GPS: gpsExif };
        const exifBytes = piexif.dump(exifObj);
        const newJpegData = piexif.insert(exifBytes, jpegData);
        const updatedBase64 = newJpegData.replace("data:image/jpeg;base64,", "");
    
        setPhoto({
            base64: updatedBase64,
            uri: null, // will be set during save
        });
    }    


    // function sharePic() {
    //     shareAsync(photo.uri).then(() => {
    //         setPhoto(undefined);
    //     });
    // };

    async function sharePic() {
        const filename = FileSystem.documentDirectory + `shared_photo_${Date.now()}.jpg`;
    
        await FileSystem.writeAsStringAsync(filename, photo.base64, {
            encoding: FileSystem.EncodingType.Base64,
        });
    
        await shareAsync(filename);
        setPhoto(undefined);
    }
    

    // async function savePic() {
    //     MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
    //         setPhoto(undefined);
    //     });
    // }

    async function savePic() {
        const filename = FileSystem.documentDirectory + `photo_with_gps_${Date.now()}.jpg`;
    
        await FileSystem.writeAsStringAsync(filename, photo.base64, {
            encoding: FileSystem.EncodingType.Base64,
        });
    
        await MediaLibrary.saveToLibraryAsync(filename);
        setPhoto(undefined);
    }    

    function discardPic() {
        setPhoto(undefined);
    }

    if(photo) {
        return (
            <ImagePreview
            photo={photo}
            onPressShare={sharePic}
            onPressSave={savePic}
            onPressDiscard={discardPic}
            hasMediaLibraryPermissions={hasMediaLibraryPermissions} />
        );
    }

    return (
        <View style={styles.container}>
            <Camera
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

            <TextButton>
                <Ionicons name={isQREnabled? "qr-code" :"qr-code-outline"} color={"#FFF"} size={28} onPress={onToggleQRButton} />
            </TextButton>

            { isQREnabled && <QRBox />}

            <CameraControlButtons
            onTakePicture={takePic}
            onToggleCameraFacing={toggleCameraFacing}
            onToggleFlashMode={toggleFlashMode}
            torchEnabled={isTorchEnabled} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    textTitle: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white",
    },

    innerTextTitle : {
        color: "#eb1064",
    },
});

export default CameraScreen;