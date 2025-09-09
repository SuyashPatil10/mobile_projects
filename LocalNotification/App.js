import { useEffect, useState } from "react";
import { Button, View, Platform, Text } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [notificationData, setNotificationData] = useState(null);
  useEffect(() => {
    registerForPushNotificationsAsync();

    const checkInitialNotification = async () => {
      const lastNotificationResponse =
        await Notifications.getLastNotificationResponseAsync();

      if (lastNotificationResponse) {
        const userName =
          lastNotificationResponse.notification.request.content.data.userName;
        setNotificationData(userName);
      }
    };

    checkInitialNotification();

  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const userName = response.notification.request.content.data.userName;
      setNotificationData(userName);
    });

    return () => subscription.remove();
  }, []);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello 👋",
        body: "This is a test notification!",
        data: { userName: "suyash" }
      },
      trigger: null,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#333" }}>
      <Button title="Send Notification" onPress={sendNotification} />
      {notificationData &&
        <View style={{ marginTop: 20, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "#FFF" }}>SUBSCRIBER</Text>
          <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>{notificationData}</Text>
        </View>}
    </View>
  );
}

// Request permissions
async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token!");
      return;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}
