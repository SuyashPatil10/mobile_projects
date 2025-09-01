import { Alert, Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";
import colors from "../utils/Colors";
import Title from "../components/Title";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";

function StartGameScreen({ onPickedNumber }) {

    const [numberedInput, setNumberedInput] = useState("");
    const { width, height } = useWindowDimensions();

    function resetInputHandler() {
        setNumberedInput("");
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(numberedInput);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid number", 
                "Input has to be a number between 1 to 99.",
                [{ text: "Okay", style:"destructive", onPress: resetInputHandler}]);
            return;
        }

        onPickedNumber(chosenNumber);
    }

    const marginTopDistance = height < 400 ? 30 : 100;

    return (
        <ScrollView style={ styles.screen }>
        <KeyboardAvoidingView style={ styles.screen } behavior="position" >
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
            <Title>Guess My Number!</Title>
            <Card>
                <InstructionText>Enter the Number!</InstructionText>
                <TextInput
                value={numberedInput}
                onChangeText={(enteredText) => setNumberedInput(enteredText)}
                style={styles.inputNumber}
                maxLength={2} 
                keyboardType="number-type"
                autoCapitalize="none"
                autoComplete="none"/>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonView}>
                        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonView}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
    )
}

// const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    screen : {
        flex: 1,
    },
    rootContainer : {
        flex: 1,
        // marginTop: deviceHeight < 400 ? 30 : 100,
        alignItems: "center",
    },

    inputContainer : {
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 36,
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

    

    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    buttonView : {
        flex: 1,
    },

    inputNumber : {
        height: 60,
        width: 60,
        fontSize: 32,
        borderBottomWidth: 2,
        borderBottomColor: colors.accent500,
        color: colors.accent500,
        fontWeight: 'bold',
        marginVertical: 8,
        textAlign: "center",
    },
});

export default StartGameScreen;
