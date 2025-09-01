import { Pressable, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../utils/styles";
import { getFormattedDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ id, description, amount, date }) {
    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate("ManageExpense", {
            expenseId: id
        });
    }

    return (
        <Pressable onPress={expensePressHandler}
        style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.textDescription]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },

    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.Colors.primary500,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.Colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1, },
        shadowOpacity: 0.4,
    },

    textBase: {
        color: GlobalStyles.Colors.primary50,
    },

    textDescription: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: "bold",
    },

    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        minWidth: 80,
    },

    amount: {
        color: GlobalStyles.Colors.primary500,
        fontWeight: "bold",
    },
});

export default ExpenseItem
