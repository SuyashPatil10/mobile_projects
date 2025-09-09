import "react-native-geasture-handler";
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
        <Drawer.Screen name="PendingForms" options={{ 
          title: "Pending Forms",
          drawerLabel: "Pending Forms",
          drawerIcon: ({ size, color }) => <Ionicons name="time-outline" size={size} color={color} />
        }} />
        <Drawer.Screen name="Forms" options={{ 
          title: "Forms",
          drawerLabel: "Forms",
          drawerIcon: ({ size, color }) => <Ionicons name="newspaper-outline" size={size} color={color} />
        }} />
        <Drawer.Screen name="NotificationsScreen" options={{ 
          title: "Notification",
          drawerLabel: "Notification",
          drawerIcon: ({ size, color }) => <Ionicons name="notifications-outline" size={size} color={color} />
        }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default DrawerLayout;