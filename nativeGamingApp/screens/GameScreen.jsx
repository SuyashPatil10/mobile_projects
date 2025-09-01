import { Alert, FlatList, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Title from "../components/Title";
import { useEffect, useMemo, useState } from "react";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    // const initialGuess = useMemo(() => generateRandomBetween(minBoundary, maxBoundary, userNumber), [userNumber]);
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const { width, height } = useWindowDimensions();
    
    const guessListLength = guessRounds.length;

    useEffect(() => {
        if(currentGuess === userNumber) {
            onGameOver(guessListLength);
        }
    }, [currentGuess, userNumber, onGameOver, guessListLength]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100; 
    }, []);

    function nextGuessHandler(direction) { // direction -> lower, higher
        if((direction === "lower" && currentGuess < userNumber) || (direction === "higher" && currentGuess > userNumber)) {
            Alert.alert(
                "Don't Lie",
                "You nkow that is't wrong",
                [{ text : "Sorry!", style : "cancel" }]
            );
        }

        if(direction ===  "lower") {
            maxBoundary = currentGuess;
        }
        else {
            minBoundary = currentGuess + 1;
        }
        const newRndNum = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNum);
        setGuessRounds((prevGuessRounds) => [newRndNum, ...prevGuessRounds]);
    }

    let content = (
        <>
            <View>
                <Title>Opponent's Guess</Title>
                <NumberContainer>{ currentGuess }</NumberContainer>
            </View>

            <Card>
                <InstructionText style={styles.instructionText}>Higher or Lower!</InstructionText>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonsContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                            <Ionicons name="remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
                        <Ionicons name="add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    );

    if(width > 500) {
        content = (
            <>
                <InstructionText style={styles.instructionText}>Higher or Lower!</InstructionText>
                <View>
                    <View style={ styles.titleWrapperContainer }>
                        <Title>Opponent's Guess</Title>
                    </View>
                    <View style={styles.buttonContainerWide}>
                        <View style={styles.buttonsContainer}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                                <Ionicons name="remove" size={24} color="white" />
                            </PrimaryButton>
                        </View>

                        <NumberContainer>{ currentGuess }</NumberContainer>

                        <View style={styles.buttonsContainer}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
                                <Ionicons name="add" size={24} color="white" />
                            </PrimaryButton>
                        </View>
                    </View>
                </View>
            </>
        );
    }

    return (
        <View style={styles.screen}>
            
            { content }

            <View style={styles.listContainer}>
                <FlatList
                data={guessRounds}
                renderItem={(itemData) => {
                    return <GuessLogItem
                    roundNumber={guessListLength - itemData.index}
                    guess={itemData.item}
                    />
                }}
                keyExtractor={(item) => item} />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        padding: 24,
        alignItems: "center",
    },

    instructionText : {
        marginBottom: 12,
    },

    buttonContainer : {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonsContainer : {
        flex: 1,
    },

    buttonContainerWide : {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingHorizontal: 36,
    },

    listContainer : {
        flex: 1,
        padding: 16,
    },

    titleWrapperContainer : {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

    },
});

export default GameScreen;
