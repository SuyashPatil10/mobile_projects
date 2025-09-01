import { Button, Image, Modal, StyleSheet, TextInput, View } from "react-native"

function GoalInput({ onSetGoalState, onAddGoalHandler, goalState, visible, modalVisibilityHandler }) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.inputContainer}>
          <View style={styles.imageContainer}>
            <Image source={require("../assets/images/target.png")} style={styles.image} />
          </View>
          <TextInput 
          onChangeText={(text) => onSetGoalState(text)}
          value={goalState}
          style={styles.inputText} 
          placeholder='Enter the goal!' 
          placeholderTextColor={"#777777"}/>
          <View style={styles.buttonContainer}>
            <Button onPress={onAddGoalHandler} title='ADD GOAL' color="#5E0ACC" />
            <Button onPress={modalVisibilityHandler} title='CANCEL' color="#F31282" />
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer : {
        width: "100%",
        flex: 1,
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        alignItems: "center",
        gap: 16,
        paddingHorizontal: 16,
        backgroundColor: "#6366f1",
    },

    inputText : {
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#E4D0FF",
        backgroundColor: "#F4D4FF",
        borderRadius: 7,
        color: "#FFF",
    },

    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 48,
    },

    imageContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    image: {
      width: 100,
      height: 100,
    }
});

export default GoalInput
