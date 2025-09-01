import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useExpenses } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { useEffect, useState } from "react";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const { expenses, dispatch } = useExpenses();

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                dispatch({ type: "expenses/set", payload: expenses });
            }
            catch(error) {
                setError("Could not fetch the expenses!");
            }
            setIsFetching(false);
        }

        fetchData();
    }, [dispatch]);

    const recentExpenses = expenses.filter((expense) => {
        const date7DaysAgo = getDateMinusDays(new Date(), 7);
        return (expense.date >= date7DaysAgo) && (expense.date <= new Date());
    });

    if(error && !isFetching) {
        conso
        return <ErrorOverlay message={error} />;
    }


    if(isFetching) {
        return <LoadingOverlay />;
    }

    return (
        <ExpensesOutput expensesPeriod={"Last 7 days expenses"} 
        expenses={recentExpenses}
        fallBackText={"No expenses registered for last 7 days"}/>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default RecentExpenses;
