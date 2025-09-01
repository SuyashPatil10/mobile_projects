import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import Signin from "./screens/Signin";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from "react-native-toast-message"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigation() {
  return(
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='signin' component={Signin} options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
    <StatusBar style='light' />
    <Toast />
    <QueryClientProvider client={queryClient}>
      <StackNavigation />
    </QueryClientProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
