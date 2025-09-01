import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function RenderExpenseItem(itemData) {
    const { id, description, amount, date } = itemData.item;
    return <ExpenseItem id={id} description={description} amount={amount} date={date} />;
}

function ExpensesList({ expenses }) {
    return (
        <FlatList
        data={expenses}
        renderItem={RenderExpenseItem}
        keyExtractor={(item) => item.id} />
    )
}

export default ExpensesList;
