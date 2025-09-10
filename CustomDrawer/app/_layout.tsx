import "react-native-gesture-handler";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";


function SafeDrawerContent(props: any) {
  try {
    return <CustomDrawerContent {...props} />;
  } catch (err) {
    console.error("❌ Drawer crashed:", err);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Drawer failed. Check console logs.</Text>
        <Text style={{ color: "red", marginTop: 8 }}>{err instanceof Error ? err.message : String(err)}</Text>
      </View>
    );
  }
}

function DrawerLayout() {
  const [fontLoaded] = useFonts(Ionicons.font);

  if(!fontLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
      <Drawer
      screenOptions={{
        drawerHideStatusBarOnOpen: false,
        drawerActiveBackgroundColor: "#5363df",
        drawerActiveTintColor: "#fff",
      }} 
      drawerContent={(props) => <SafeDrawerContent {...props} />}
      >
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
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default DrawerLayout;