import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../utils/styles";

function Input({ label, style, textInputConfig, invalid }) {

    let inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline) {
        inputStyles = [styles.input, styles.inputMultiline];
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{ label }</Text>
            <TextInput style={[inputStyles, invalid && styles.invalidInput]} { ...textInputConfig } />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 16,
        // flex: 1,
    },

    label: {
        fontSize: 12,
        color: GlobalStyles.Colors.primary100,
        marginBottom: 4,
    },

    input: {
        backgroundColor: GlobalStyles.Colors.primary100,
        color: GlobalStyles.Colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },

    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top",
    },

    invalidLabel: {
        color: GlobalStyles.Colors.error500,
    },

    invalidInput: {
        backgroundColor: GlobalStyles.Colors.error50,
    },
});

export default Input;
