import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements'
import colors from '../constrants/colors'

var { width, height } = Dimensions.get("window")

const DefaultButton = ({
    title,
    onPress
}) => (
        <Button
            title={title}
            onPress={() => onPress()}
            buttonStyle={styles.buttonStyle}
        />
    );
const styles = StyleSheet.create({
    buttonStyle: {
        width: width * .85,
        height: height * .06,
        borderRadius: 25,
        backgroundColor: colors.mainGray,
        marginVertical: 10
    }
})
export { DefaultButton }
