import { Pressable, StyleSheet, Text, View } from "react-native"

function GoalItem({ goal, onDeleteGoalItem }) {
    return (
        <View style={styles.goalItem}> 
            <Pressable android_ripple={{ color: "#FFFEEE" }} onPress={() => onDeleteGoalItem(goal.id)}>
                <Text style={styles.goalText}>
                    {goal.text}
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        marginBottom: 8,
        backgroundColor: "#777EEE",
        borderRadius: 2,
      },
    
      goalText: {
        padding: 8,
        color: "#FFF",
        fontWeight: 500,
      },
});

export default GoalItem
