import Toast from "react-native-toast-message";

export function showToast(type, text1, text2) {
    Toast.show({
        type,
        text1,
        text2
    });
}