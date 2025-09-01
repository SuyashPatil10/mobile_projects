import { StyleSheet, Text, View } from "react-native"

function Subtitle({ children }) {
    return (
        <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>{ children }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    subtitle : {
        color: "#e1b080",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },

    subtitleContainer : {
        padding: 6,
        borderBottomColor: "#e1b080",
        borderBottomWidth: 2,
        marginHorizontal: 12,
        marginVertical: 4,
    },
});

export default Subtitle
