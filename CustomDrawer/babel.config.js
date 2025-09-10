module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            // 👇 very important: must be last in the list
            "react-native-reanimated/plugin",
        ],
    };
};
