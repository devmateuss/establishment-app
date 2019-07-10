import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';

var { width, height } = Dimensions.get("window")

const DefalutTextInput = ({
    placeholder,
    onChange,
    value,
    secureTextEntry
}) => (
        <TextInput
            secureTextEntry={secureTextEntry}
            style={styles.textInputStyle}
            placeholder={placeholder}
            placeholderTextColor={"#808080"}
            onChangeText={(text) => onChange(text)}
            value={value}
        />
    );
const styles = StyleSheet.create({
    textInputStyle: {
        width: width * .85,
        height: height * .06,
        borderWidth: .30,
        borderColor: "gray",
        borderRadius: 25,
        backgroundColor: "#e6e6e6",
        marginVertical: 10,
        shadowColor: "rgba(72, 96, 35, 0.35)",
        shadowOffset: { width: -1, height: 1 },
        shadowOpacity: 1,
        elevation: 3,
        paddingLeft: 15,
    }
})
export { DefalutTextInput }
