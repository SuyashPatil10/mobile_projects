import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../utils/styles";
import { Text } from "react-native";


function ExpensesOutput({ expenses, expensesPeriod, fallBackText }) {

    let content = <Text style={styles.infoText}>{fallBackText}</Text>;

    if(expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
            { content }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.Colors.primary700,
    },

    infoText: {
        fontSize: 16,
        fontWeight: "semibold",
        textAlign: "center",
        color: "white",
        marginTop: 32,
    },
});

export default ExpensesOutput;
