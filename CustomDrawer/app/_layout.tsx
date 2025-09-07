// import "react-native-geasture-handler";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
      screenOptions={{
        drawerHideStatusBarOnOpen: false,
        drawerActiveBackgroundColor: "#5363df",
        drawerActiveTintColor: "#fff",
      }} 
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Index" options={{ 
          title: "Home",
          drawerLabel: "Home",
          drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />
        }} />
        <Drawer.Screen name="Profile" options={{ 
          title: "Profile",
          drawerLabel: "Profile",
          drawerIcon: ({ size, color }) => <Ionicons name="person-outline" size={size} color={color} />
        }} />
        <Drawer.Screen name="News" options={{ 
          title: "News",
          drawerLabel: "News",
          drawerIcon: ({ size, color }) => <Ionicons name="newspaper-outline" size={size} color={color} />
        }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default DrawerLayout;