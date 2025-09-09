import React, { useEffect, useState } from "react";
import { Button, View, Platform, Text, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

type NotificationData = {
  userName?: string;
};

const NotificationsScreen: React.FC = () => {
  const [notificationData, setNotificationData] = useState<string | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync();

    const checkInitialNotification = async () => {
      const lastNotificationResponse =
        await Notifications.getLastNotificationResponseAsync();

      if (lastNotificationResponse) {
        const data =
          lastNotificationResponse.notification.request.content.data as NotificationData;
        if (data.userName) setNotificationData(data.userName);
      }
    };

    checkInitialNotification();
  }, []);

  useEffect(() => {
    const subscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data as NotificationData;
        if (data.userName) setNotificationData(data.userName);
      });

    return () => subscription.remove();
  }, []);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello 👋",
        body: "This is a test notification!",
        data: { userName: "suyash" },
      },
      trigger: null,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333",
      }}
    >
      <Button title="Send Notification" onPress={sendNotification} />
      {notificationData && (
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#FFF" }}>SUBSCRIBER</Text>
          <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
            {notificationData}
          </Text>
        </View>
      )}
    </View>
  );
};

// Request permissions
async function registerForPushNotificationsAsync(): Promise<void> {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  if (!Device.isDevice) {
    Alert.alert("Must use physical device for Push Notifications");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    Alert.alert("Failed to get notification permissions!");
  }
}

export default NotificationsScreen;
