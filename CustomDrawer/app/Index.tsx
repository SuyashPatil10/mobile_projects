import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Button, Text, View } from "react-native";

function Index() {
    const navigation  = useNavigation();

    function onToggleDrawer() {
        navigation.dispatch(DrawerActions.toggleDrawer());
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Index Screen</Text>
            <Button title="Open Drawer" onPress={onToggleDrawer} />
        </View>
    );
}

export default Index;
