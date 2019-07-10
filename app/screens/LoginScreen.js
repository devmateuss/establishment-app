import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, AsyncStorage, Modal, KeyboardAvoidingView } from 'react-native';
import colors from '../constrants/colors'
import { DefalutTextInput, DefaultButton } from '../components'
import urls from '../constrants/urls'
import * as api from '../api'

class LoginScreen extends Component {
    state = {
        signUpModal: false
    }

    componentWillMount = async () => {
        const token = await AsyncStorage.getItem("user-token")

        if (token !== null) this.props.navigation.navigate("App")
        // AsyncStorage.clear()
    }

    componentWillUnmount = () => {
        this.setState({ signUpModal: false })
    }


    login = async () => {
        const { email, password } = this.state
        const url = urls.base + urls.sign_in

        const body = {
            email,
            password
        }
        try {
            const response = await api.PostRequest(url, body)
            AsyncStorage.setItem("fance", String(1000))
                .then(() => {
                    console.log("Face armazenado com sucesso!!!")
                    AsyncStorage.setItem("user-token", response.data.token)
                        .then(() => {
                            console.log("Token armazenado com sucesso!!!")
                            this.props.navigation.navigate("App")
                        })
                })
        } catch (e) {
            alert("erro na comunicação com o servidor")
        }
    }

    signUp = async () => {
        const { email, password } = this.state
        const url = urls.base + urls.sign_up

        const body = {
            email,
            password
        }
        try {
            const response = await api.PostRequest(url, body)
            AsyncStorage.setItem("fance", String(1000))
                .then(() => {
                    AsyncStorage.setItem("user-token", response.data.token)
                        .then(() => {
                            console.log("Token armazenado com sucesso!!!")
                            this.props.navigation.navigate("App")
                        })
                })
        } catch (e) {
            alert("erro na comunicação com o servidor")
        }
    }

    render() {
        return (
            <View style={styles.container} >

                <KeyboardAvoidingView style={{ justifyContent: "center", alignItems: "center" }} behavior="padding" enabled>
                    <DefalutTextInput
                        onChange={(email) => this.setState({ email })}
                        placeholder={"email"}
                    />
                    <DefalutTextInput
                        onChange={(password) => this.setState({ password })}
                        secureTextEntry={true}
                        placeholder={"senha"}
                    />
                    <DefaultButton
                        onPress={() => this.login()}
                        title={"Entrar"}
                    />
                    <TouchableWithoutFeedback onPress={() => this.setState({ signUpModal: true })}>
                        <Text>Registre-se</Text>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>

                <Modal
                    visible={this.state.signUpModal}
                    nimationType="fade"
                >
                    <TouchableWithoutFeedback onPress={() => this.setState({ signUpModal: false })} >
                        <View style={{ flex: 1, backgroundColor: 'transparent' }} ></View>
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 1.5, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                        <KeyboardAvoidingView style={{ justifyContent: "center", alignItems: "center" }} behavior="padding" enabled>
                            <DefalutTextInput
                                placeholder={'email'}
                                onChange={email => this.setState({ email })}
                            />
                            <DefalutTextInput
                                placeholder={'senha'}
                                secureTextEntry={true}
                                onChange={password => this.setState({ password })}
                            />
                            <DefaultButton
                                title={'Registrar'}
                                onPress={() => this.signUp()}
                            />
                            <DefaultButton
                                title={'Cancelar'}
                                onPress={() => this.setState({ signUpModal: false })}
                            />
                        </KeyboardAvoidingView>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.setState({ signUpModal: false })} >
                        <View style={{ flex: 1, backgroundColor: 'transparent' }} ></View>
                    </TouchableWithoutFeedback>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainWhite,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default LoginScreen;
