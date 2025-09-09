import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

function Assets() {
    const { type } = useLocalSearchParams<{ type?: string }>();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Assets",
            headerShown: true,
        })
    }, [navigation]);
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{ type } Assets Screen</Text>
        </View>
    );
}

export default Assets;