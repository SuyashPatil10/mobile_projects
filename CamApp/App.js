import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from './screens/CameraScreen';
import MapsScreen from './screens/MapsScreen';
import { Ionicons } from '@expo/vector-icons';
import MediaImagesScreen from './screens/MediaImagesScreen';
import ImagesScreen from './screens/ImagesScreen';
import ImageViewScreen from './screens/ImageViewScreen';


const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#121212",
      }, 
      headerTintColor: "#EEEFFF",
      headerTitleStyle: {
        color: "#EEEFFF",
      }
    }}>
      <Stack.Screen name="Media" component={MediaImagesScreen}  />
      <Stack.Screen name="Images" component={ImagesScreen} />
      <Stack.Screen name="ImageView" component={ImageViewScreen} />
    </Stack.Navigator>
  );  
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <BottomTabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Camera') {
                iconName = focused ? 'camera' : 'camera-outline';
              } else if (route.name === 'Maps') {
                iconName = focused ? 'map' : 'map-outline';
              }
              else if(route.name === 'Stack') {
                iconName = focused ? 'image' : 'image-outline'
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: '#EEEFFF',
            tabBarStyle: {
              backgroundColor: "#121212",
              borderTopWidth: 0,
            },
            headerStyle: {
              backgroundColor: "#121212",
            }, 
            headerTintColor: "#EEEFFF",
            headerTitleStyle: {
              color: "#EEEFFF",
            }
          })}
        >
          <BottomTabs.Screen name="Camera" component={CameraScreen} style={styles.container}
          options={{
            headerShown: true,
          }} />
          <BottomTabs.Screen name="Stack" component={StackNavigation} 
          options={{ 
            tabBarLabel: "Media" ,headerShown: false 
          }} />
          <BottomTabs.Screen name="Maps" component={MapsScreen} />
        </BottomTabs.Navigator>

      </NavigationContainer>
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
