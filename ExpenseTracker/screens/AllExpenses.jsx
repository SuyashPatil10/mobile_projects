import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useExpenses } from "../store/expenses-context";

function AllExpenses() {

    const { expenses } = useExpenses();

    return (
        <ExpensesOutput expensesPeriod={"All Expenses"} 
        expenses={expenses}
        fallBackText={"No expenses registered found"} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default AllExpenses;
