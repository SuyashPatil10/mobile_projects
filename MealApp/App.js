
import { Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";


import CategoryScreen from './screens/CategoryScreen';
import FavouritesScreen from "./screens/FavoritesScreen";
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealsDetailsScreen from './screens/MealsDetailsScreen';
import { Ionicons } from '@expo/vector-icons';
import { FavouriteContextProvider } from './store/context/FavouriteContextProvider';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator 
    screenOptions={{
      headerStyle: { backgroundColor: "#121212", },
        headerTintColor: "white",
        sceneStyle: { backgroundColor: "#343434" },
        drawerContentStyle: { backgroundColor: "#121222",},
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#e1b080",
        drawerActiveBackgroundColor: "#343434",
    }}>
      <Drawer.Screen name='Categories' component={CategoryScreen}
      options={{
        title: "All Categories",
        drawerIcon: ({ color, size }) => <Ionicons name='list' color={color} size={size} />
      }} />

    <Drawer.Screen name='Favourites' component={FavouritesScreen}
      options={{
        title: "Favourites",
        drawerIcon: ({ color, size }) => <Ionicons name='heart' color={color} size={size} />
      }} />
    </Drawer.Navigator>
  );
}




export default function App() {

  return (
    <>
    <StatusBar style='light' />

    {/* <FavouriteContextProvider> */}
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Drawer'
        screenOptions={{
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "white",
          contentStyle: {
            backgroundColor: "#343434"
          }
        }}>
          <Stack.Screen 
          name='Drawer'
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }} />

          <Stack.Screen 
          name='MealsOverview' 
          component={MealsOverviewScreen}
          
          />

          <Stack.Screen 
          name='MealsDetails'
          component={MealsDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    {/* </FavouriteContextProvider> */}
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
