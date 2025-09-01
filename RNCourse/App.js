
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [goalState, setGoalState] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setmodalIsVisible] = useState(false);

  function modalVisibilityHandler() {
    setmodalIsVisible((modal) => !modal);
  }

  function addGoalHandler() {
    setCourseGoals((courseGoals) => [...courseGoals, { text: goalState, id : Math.random().toString() }]);
    setGoalState("");
    modalVisibilityHandler();
  }

  function onDeleteGoalItem(id) {
    setCourseGoals((courseGoals) => {
      return courseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <View style={styles.container}>
      <Button title='Add Goal' color="#777FFF" onPress={modalVisibilityHandler} />
      <GoalInput 
        visible={modalIsVisible}
        setCourseGoals={setCourseGoals} 
        onAddGoalHandler={addGoalHandler}
        modalVisibilityHandler={modalVisibilityHandler}
        onSetGoalState={setGoalState} 
        goalState={goalState} />


      <View>
        <Text style={styles.dummyText}>Goals</Text>
      </View>
      
      
      <View style={styles.goalsContainer}>
        <FlatList 
        data={courseGoals}
        alwaysBounceVertical={false} 
        keyExtractor={(item, index) => {
          return item.id;
        }}
        renderItem={(itemData) => {
          return (
            <GoalItem goal={itemData.item} onDeleteGoalItem={onDeleteGoalItem} />
          );
        }}/>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
    paddingHorizontal: 16
  },

  dummyText : {
    margin: 16,
    fontSize: 18,
    fontWeight: 600,
  },

  goalsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
