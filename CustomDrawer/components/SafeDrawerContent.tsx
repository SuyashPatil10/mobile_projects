import { Text, View } from "react-native";
import CustomDrawerContent from "./CustomDrawerContent";

function SafeDrawerContent(props: any) {
  try {
    return <CustomDrawerContent {...props} />;
  } catch (err) {
    console.error("❌ Drawer crashed:", err);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Drawer failed. Check console logs.</Text>
        <Text>{err instanceof Error ? err.message : String(err)}</Text>
      </View>
    );
  }
}
