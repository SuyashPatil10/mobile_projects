import { StyleSheet, Text, View, Dimensions } from "react-native";
import colors from "../utils/Colors";

function NumberContainer({ children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{ children }</Text>
        </View>
    )
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container : {
        borderWidth: 4,
        borderColor: colors.accent500,
        padding: deviceWidth > 380 ? 24 : 12,
        margin: deviceWidth > 380 ? 24 : 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },

    numberText :{
        color: colors.accent500,
        fontFamily: "open-sans-bold",
        fontSize: deviceWidth > 380 ? 36 : 28,
    }
});

export default NumberContainer;
