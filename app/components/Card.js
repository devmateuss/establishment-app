import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'

var { width, height } = Dimensions.get("window")

const Card = ({
    title,
    adress,
    onPress
}) => (
        <TouchableOpacity onPress={() => onPress()} style={styles.container} >
            <Text style={styles.titleStyle} >{title.toUpperCase()}</Text>
            <View style={styles.subContainer} >
                <Text style={styles.subTitle} >{adress}</Text>
            </View>
        </TouchableOpacity>
    );
const styles = StyleSheet.create({
    container: {
        width: width * .70,
        height: height * .20,
        borderColor: "black",
        borderRadius: 30,
        shadowColor: "rgba(72, 96, 35, 0.35)",
        shadowOffset: { width: -1, height: 1 },
        shadowOpacity: 1,
        elevation: 3,
        alignItems: "center",
        justifyContent: "space-around",
        marginVertical: 10,
        backgroundColor: "#737373",
    },
    subContainer: {
        flexWrap: "wrap",
        marginHorizontal: 20,
        alignSelf: 'flex-start',
        justifyContent: "space-between"
    },
    titleStyle: {
        color: "#fff",
        fontWeight: "bold",
        width: width * .70,
        textAlign: "center"
    },
    subTitle: {
        color: "#d9d9d9"
    },
    iconPosition: {
        position: "absolute",
        bottom: 15,
        left: width * .55
    }
})
export { Card };
