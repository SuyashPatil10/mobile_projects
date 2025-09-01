import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import { GlobalStyles } from './utils/styles';
import { Ionicons } from "react-native-vector-icons";
import IconButton from './components/UI/IconButton';
import { ExpensesContextProvider } from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
  <BottomTabs.Navigator initialRouteName='RecentExpenses'
  screenOptions={({ navigation }) => ({
    headerStyle :{
      backgroundColor: GlobalStyles.Colors.primary500,
    },
    headerTintColor: "white",
    tabBarStyle: { backgroundColor: GlobalStyles.Colors.primary500 },
    tabBarActiveTintColor: GlobalStyles.Colors.accent500,
    headerRight: ({ tintColor }) => <IconButton icon={"add-outline"} size={24} color={tintColor} onPress={() => {
      navigation.navigate("ManageExpense");
    }} />
  })
  }
  >
    <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses}
    options={{
      title: "Recent Expenses",
      tabBarLabel: "Recent",
      tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" color={color} size={size} />
    }} />
    <BottomTabs.Screen name='AllExpenses' component={AllExpenses}
    options={{
      title: "All Expenses",
      tabBarLabel: "All Expenses",
      tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />
    }}/>
  </BottomTabs.Navigator>);
}

export default function App() {
  return (
    <>
    <StatusBar style='light' />
    <ExpensesContextProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ExpensesOverview' screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.Colors.primary500,
        },
        headerTintColor: "white",
      }}>
        <Stack.Screen 
        name='ExpensesOverview' 
        component={ExpensesOverview}
        options={{
          headerShown: false,
        }} />
        <Stack.Screen name='ManageExpense' component={ManageExpense} options={{ 
          headerShown: true,
          presentation: "modal",
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
