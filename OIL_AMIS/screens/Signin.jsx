import { Pressable, StyleSheet, Text, View } from "react-native";
import SigninForm from "../components/SigninForm";

function Signin({ navigation }) {

    function navigateLogin() {
        navigation.navigate('login');
    }

    return (
        <>
            <View style={styles.backgroundContiner}>
                <View style={styles.signinHeaderView}>
                    <Text style={styles.signinHeaderText}>OIL INDIA</Text>
                </View>
                <View style={styles.signinView}>
                    <Text style={styles.signinText}>Sign in</Text>
                    <Text style={styles.signinSmallText}>Welcome, lets introduce yourself before we begin</Text>
                </View>
            </View>

            <View style={styles.overlayScreen}>
                <SigninForm />
            </View>

            <View style={styles.loginView}>
                <Text style={styles.loginText}>already have an account!</Text>
                <Pressable onPress={navigateLogin}>
                    <Text style={styles.loginButton}>Login</Text>
                </Pressable>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    backgroundContiner: {
        flex: 1,
        // backgroundColor: "#eab308",
        backgroundColor: "#4f46e5",
        width: "100%",
        padding: 16,
    },    

    overlayScreen: {
        height: "70%",
        width: "100%",
        position: "absolute",
        bottom: 0,
        backgroundColor: "#f9fafb",
        borderTopRightRadius: 80,
        padding: 24,
    },

    signinHeaderView: {
        marginTop: 30,
    },

    signinHeaderText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#f9fafb",
    },

    signinView: {
        marginTop: 50,
    },

    signinText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#f9fafb",
        textAlign: "right",
    },

    signinSmallText: {
        fontSize: 14,
        color: "#f9fafb",
        textAlign: "right",
    },

    loginView: {
        marginVertical: 12,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
    },

    loginText: {
        fontSize: 12,
        fontWeight: "light",
        textAlign: "center",
    },

    loginButton: {
        color: "#2563eb",
    },
});


export default Signin;
