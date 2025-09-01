import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../utils/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : "",
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : "",
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : "",
            isValid: true,
        },
    });

    function inputChangedHandler(inputIdentifier, value) {
        setInputs((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: { value, isValid: true}
            };
        });
    }

    
    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };
        
        const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const isDateValid = expenseData.date.toString() !== "Invalid Date";
        const isDescriptionValid = expenseData.description.trim().length > 0;
        
        if(!isAmountValid || !isDateValid || !isDescriptionValid) {
            // Alert.alert("Invalid Input", "Please fill your expense information correctly!!");
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: isAmountValid },
                    date : { value: curInputs.date.value, isValid: isDateValid },
                    description: { value: curInputs.description.value, isValid: isDescriptionValid },
                };
            });
            return;
        }
        
        onSubmit(expenseData);
    }
    
    const isFormValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRows}>
                <Input label="amount"
                style={styles.rowInput}
                invalid={!inputs.amount.isValid}
                textInputConfig={{
                    keyboardType: "decimal-pad",
                    onChangeText: inputChangedHandler.bind(this, "amount"),
                    value: inputs.amount.value
                }} />
                <Input label="date" 
                style={styles.rowInput}
                invalid={!inputs.date.isValid}
                textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, "date"),
                    value: inputs.date.value
                }}/>
            </View>

            <Input label="description"
            invalid={!inputs.description.isValid}
            textInputConfig={{
                multiline: true,
                autoCorrect: false,
                onChangeText: inputChangedHandler.bind(this, "description"),
                value: inputs.description.value,
            }} />

            {isFormValid && <Text style={styles.errorText}>Invalid input values, please check your entered data</Text>}

            <View style={styles.buttonContainer}>
                <Button style={styles.button} mode={"flat"} onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 100,
    },

    inputRows: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    rowInput: {
        flex: 1,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 24,
        textAlign: "center",
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "cenetr",
    },

    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },

    errorText: {
        textAlign: "center",
        color: GlobalStyles.Colors.error500,
        fontSize: 14,
        margin: 8,
        marginBottom: 16,
    },
});

export default ExpenseForm;
