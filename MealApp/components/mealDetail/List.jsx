import { Text, View, StyleSheet } from "react-native";

function List({ data }) {
    return (
        data.map((dataPoint) => {
            return (
                <View key={dataPoint} style={styles.listItem}>
                    <Text style={styles.itemText}>{dataPoint}</Text>
                </View>
            );

        })
    );
}

const styles = StyleSheet.create({
    listItem : {
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: "#e1b080",
    },

    itemText : {
        color: "#121212",
        textAlign: "center",

    },
});

export default List;
