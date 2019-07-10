import React from 'react';
import { Text, View, StyleSheet, Modal } from 'react-native';
import { Button } from 'react-native-elements'
import colors from '../constrants/colors'

const DrawerContainer = ({
    navigation,
}) => (
        <View style={styles.container} >
            <Text style={styles.textOption} onPress={() => navigation.navigate('Home')}>Lista de Estabelecimentos</Text>
            <Text style={styles.textOption} onPress={() => navigation.navigate('Added')}>Cadastrar Estabelecimentos</Text>
        </View>
    );
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainGray,
        paddingTop: 20
    },
    textOption: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5
    }
})
export default DrawerContainer;
