import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../utils/styles";
import Button from "../components/UI/Button";
import { useExpenses } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const { expenses, dispatch } = useExpenses();

    const selectedExpense = expenses.find((expense) => expense.id === editedExpenseId);



    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            dispatch({ type: "expense/delete", payload: { id: editedExpenseId } });
            navigation.goBack();
        }
        catch(error){
            setError("Could not delete the expense - please try later!");
            setIsSubmitting(false);
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try {
            if(isEditing) {
                dispatch({
                    type: "expense/update",
                    payload: expenseData,
                });
                await updateExpense(editedExpenseId, expenseData);
            }
            else {
                const id = await storeExpense(expenseData);
                dispatch({
                    type: "expense/add",
                    payload: { id,  ...expenseData },
                });
            }
            navigation.goBack();
        }
        catch(error) {
            setError("Could not save the data - please try later!");
            setIsSubmitting(false);
        }
    }


    if(error && !isSubmitting) {
        return <ErrorOverlay message={error}  />
    }

    if(isSubmitting) {
        return <LoadingOverlay />;
    }

    return (
        <View style={styles.container}>

            <ExpenseForm onCancel={cancelHandler} 
            onSubmit={confirmHandler}
            submitButtonLabel={isEditing ? "update" : "add"}
            defaultValues={selectedExpense} />

            {isEditing && 
            <View style={styles.deleteContainer}>
            <IconButton 
            icon={"trash"} 
            size={36} 
            color={GlobalStyles.Colors.error500} 
            onPress={deleteExpenseHandler} />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.Colors.primary800,
    },

    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.Colors.primary200,
        alignItems: "center",
    },
});

export default ManageExpense;
