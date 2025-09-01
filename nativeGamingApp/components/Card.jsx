import { Dimensions, StyleSheet, View } from "react-native";
import colors from "../utils/Colors";

function Card({ children }) {
    return (
        <View style={styles.inputContainer}>
            { children }
        </View>
    )
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    inputContainer : {
        justifyContent: 'center',
        alignItems: "center",
        marginTop: deviceWidth > 380 ? 36 : 18,
        marginHorizontal: 24,
        borderRadius: 8,
        padding: 16,
        backgroundColor: colors.primary800,
        elevation: 4, // only android specific shadow property
        
        // Below shadow properties works only for iOS
        shadowColor: "black",
        textShadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
});

export default Card;
