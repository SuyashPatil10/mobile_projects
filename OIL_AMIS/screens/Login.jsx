import { Pressable, StyleSheet, Text, View } from "react-native";
import LoginForm from "../components/LoginForm";

function Login({ navigation }) {

    function navigateSignin() {
        navigation.navigate("signin");
    }

    return (
        <>
            <View style={styles.backgroundContiner}>
                <View style={styles.loginHeaderView}>
                    <Text style={styles.loginHeaderText}>OIL INDIA</Text>
                </View>
                <View style={styles.loginView}>
                    <Text style={styles.loginText}>Login</Text>
                    <Text style={styles.loginSmallText}>Welcome again. lets input your login information</Text>
                </View>
            </View>

            <View style={styles.overlayScreen}>
                <LoginForm />
            </View>

            <View style={styles.signinView}>
                <Text style={styles.signinText}>Don't have an account!</Text>
                <Pressable onPress={navigateSignin}>
                    <Text style={styles.signinButton}>Sign in</Text>
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
        borderTopLeftRadius: 80,
        padding: 24,
    },

    loginHeaderView: {
        marginTop: 30,
    },

    loginHeaderText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#f9fafb",
    },

    loginView: {
        marginTop: 50,
    },

    loginText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#f9fafb",
    },

    loginSmallText: {
        fontSize: 14,
        color: "#f9fafb",
    },

    signinView: {
        marginVertical: 12,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
    },

    signinText: {
        fontSize: 12,
        fontWeight: "light",
        textAlign: "center",
    },

    signinButton: {
        color: "#2563eb",
    },
});

export default Login;
