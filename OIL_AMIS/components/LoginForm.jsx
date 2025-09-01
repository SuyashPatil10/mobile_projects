import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Checkbox from "expo-checkbox";
import Input from "./Input";
import Button from "./Button";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isCheckBoxSelected, setIsCheckBoxSelected] = useState(false);

    function onChangeUsername(value) {
        setUsername(value);
    }

    function onChangeUserPassword(value) {
        setUserPassword(value);
    }

    function onToggleCheckBoxValue() {
        setIsCheckBoxSelected((isCheckBoxSelected) => !isCheckBoxSelected);
    }

    return (
        <View style={styles.formContainer}>
            <Text style={styles.headerText}>Login with your email</Text>

            <View style={styles.line}></View>

            <View style={styles.inputContainer}>
                <Input changeTextHandler={onChangeUsername} value={username} placeholder={"email"} type={"email-address"} />
                <Input changeTextHandler={onChangeUserPassword} value={userPassword} placeholder={"password"} type={"visible-password"} />

                <View style={styles.checkBoxContainer}>
                    <Checkbox
                    value={isCheckBoxSelected}
                    onValueChange={onToggleCheckBoxValue}
                    // color={isCheckBoxSelected ? '#eab308' : undefined}/>
                    color={isCheckBoxSelected ? '#4f46e5' : undefined}/>
                    <Text style={styles.rememberText}>Remember Me</Text>

                </View> 
                    <Button>Login Now</Button>
            </View>

            <View style={styles.googleContainer}>
                <Text style={styles.headerText}>Login with Google</Text>

                <View style={styles.line}></View>

                <Button>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6 }}>
                        <Ionicons name="logo-google" size={24} color="#FFF" />
                        <Text style={{fontSize: 16, fontWeight: "bold", color: "#FFF" }}>Login with Google</Text>
                    </View>
                </Button>
            </View>

            

        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 20,
    },

    headerText: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "light",
    },

    line: {
        width: "100%",
        height: 1.5,
        backgroundColor: "#333",
        borderRadius: 1,
        marginVertical: 16,
    },

    inputContainer: {
        display: "flex",
        gap: 24,
    },

    checkBoxContainer: {
       display: "flex",
       flexDirection: "row",
       justifyContent: "flex-end",
       alignItems: "center",
       gap: 8,
    },

    rememberText: {
        fontSize: 16,
        fontWeight: "semibold",
        marginHorizontal: 8,
    },

    googleContainer: {
        marginTop: 24,
    },
});

export default LoginForm;
