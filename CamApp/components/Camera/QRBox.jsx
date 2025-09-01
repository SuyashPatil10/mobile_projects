import { StyleSheet } from "react-native";

function QRBox() {
    return (
        <View style={styles.overlay}>
            <View style={styles.qrScannerBox}>
                <View style={styles.qrCornerTopLeft} />
                <View style={styles.qrCornerTopRight} />
                <View style={styles.qrCornerBottomLeft} />
                <View style={styles.qrCornerBottomRight} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        left: "47%",
        top: "45%",
        transform: "translate(-45%, -47%)",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    qrScannerBox: {
        width: 250,
        height: 250,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
        
    qrCornerTopLeft: {
        position: "absolute",
        top: -2,
        left: -2,
        width: 30,
        height: 30,
        borderTopWidth: 6,
        borderLeftWidth: 6,
        borderColor: "#FFF", // #00FF00
        borderRadius: 4,
    },
        
    qrCornerTopRight: {
        position: "absolute",
        top: -2,
        right: -2,
        width: 30,
        height: 30,
        borderTopWidth: 6,
        borderRightWidth: 6,
        borderColor: "#FFF",
        borderRadius: 4,
    },
        
    qrCornerBottomLeft: {
        position: "absolute",
        bottom: -2,
        left: -2,
        width: 30,
        height: 30,
        borderBottomWidth: 6,
        borderLeftWidth: 6,
        borderColor: "#FFF",
        borderRadius: 4,
    },
        
    qrCornerBottomRight: {
        position: "absolute",
        bottom: -2,
        right: -2,
        width: 30,
        height: 30,
        borderBottomWidth: 6,
        borderRightWidth: 6,
        borderColor: "#FFF",
        borderRadius: 4,
    },
});

export default QRBox;
