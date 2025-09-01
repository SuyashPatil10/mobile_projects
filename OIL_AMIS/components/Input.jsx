import { StyleSheet, TextInput, View } from "react-native";

function Input({ changeTextHandler, value, placeholder, type, isSecure, }) {
    return (
            <TextInput style={styles.input} 
            onChangeText={changeTextHandler}
            value={value}
            placeholder={placeholder} 
            keyboardType={type}
            cursorColor="#111827"
            secureTextEntry={isSecure} />
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    input: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: "#e5e7eb",
        color: "#111827",
    }
});

export default Input;
