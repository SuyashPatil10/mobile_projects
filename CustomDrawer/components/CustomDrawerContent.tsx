import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function CustomDrawerContent(props: any) {
    const router = useRouter();
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View style={{flex: 1 }}>
            <DrawerContentScrollView {...props}
            scrollEnabled={false}
            contentContainerStyle={{ 
                backgroundColor: "#dde3fe", 
                flex: 1,
                paddingHorizontal: 0, 
            }}
            >
                <View
                style={{
                    padding: 20,
                    // backgroundColor: "#dde3fe"
                }}>
                    <Image
                    source={{ uri: "https://scontent-bom2-1.cdninstagram.com/v/t51.2885-19/242292521_384537819826580_5952672369328113678_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby43MzYuYzIifQ&_nc_ht=scontent-bom2-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2QEiP7YwKz1wcI4EjbTGYv8YZ0NeKvkaL4MYPARZolFQND3deq8wV-wMZVSq0qdvb50&_nc_ohc=QOY_OpIxQHAQ7kNvwHaFWjK&_nc_gid=MMrS2I8yad7yqWDc1JcjtQ&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AfZhNoN0doODyPXu7YShs2wj5LotVE1uIE3rcEEBoXxWvA&oe=68C37CF1&_nc_sid=7d3ac5" }}
                    style={{ width: 120, height: 120, alignSelf: "center", borderRadius: 60 }} />
                    <Text
                    style={{
                        alignSelf: "center",
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginTop: 10,
                        color: "#5363fe",
                    }}>
                        Suyash Patil
                    </Text>
                </View>

                <View
                style={{
                    // backgroundColor: "#FFF",
                    // width: "100%",
                    flex: 1,
                    marginTop: 20,
                    alignSelf: "stretch",
                }}>
                    <DrawerItemList
                    {...props}
                    itemStyle={{
                    width: "100%",         // force full width
                    marginHorizontal: 0,   // remove left/right margins
                    paddingHorizontal: 0,  // remove inner padding
                    }}
                />

                {/* <DrawerItem
                    label="Logout"
                    onPress={() => router.replace("/Index")}
                    style={{
                    width: "100%",
                    marginHorizontal: 0,
                    paddingHorizontal: 0,
                    }}
                    labelStyle={{
                    marginLeft: 0, // remove extra left indent
                    }}
                /> */}
                </View>
            </DrawerContentScrollView>

            <View
            style={{
                borderTopColor: "#dde2fe",
                borderTopWidth: 1,
                padding: 20,
                paddingBottom:  bottom + 20,
                gap: 20,
                backgroundColor: "#3d4878",
            }}>
                <Pressable
                style={{
                    width: "100%",
                    paddingLeft: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 20,
                }}>
                    <Ionicons name="settings-outline" size={24} color="#fff" />
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "500",
                        color: "#fff"
                    }}>Settings</Text>
                </Pressable>
                <Pressable
                style={{
                    paddingLeft: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 20,
                }}>
                    <Ionicons name="exit-outline" size={24} color="#fff" />
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "500",
                        color: "#fff"
                    }}>Logout</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default CustomDrawerContent;