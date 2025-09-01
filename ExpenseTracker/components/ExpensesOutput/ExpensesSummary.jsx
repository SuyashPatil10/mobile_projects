import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../utils/styles";

function ExpensesSummary({ periodName, expenses }) {

    const expensesSum = expenses.reduce((accumulator, expense) => {
        return accumulator + expense.amount;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{ periodName }</Text>
            <Text style={styles.sum}>$ {expensesSum.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.Colors.primary50,
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    period: {
        fontSize: 12,
        color: GlobalStyles.Colors.primary400,
    },

    sum: {
        fontSize: 16,
        fontWeight: "bold",
        color: GlobalStyles.Colors.primary500,
    },
});

export default ExpensesSummary;
