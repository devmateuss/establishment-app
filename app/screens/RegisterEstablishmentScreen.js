import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import {
    DefalutTextInput,
    LoadingSpiner,
    DefaultButton
} from '../components'
import urls from '../constrants/urls'
import * as api from '../api'
import colors from '../constrants/colors'
import axios from 'axios'
import { GET_ESTABLISHMENT } from '../actions/establishmentAction'

class RegisterEstablishmentScreen extends Component {
    state = {
        loading: true,
        clicable: true,
        update: false,
        name: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        loading: false
    }

    componentWillMount = async () => {
        const { params } = this.props.navigation.state
        var token = await AsyncStorage.getItem("user-token")

        if (params) {
            console.log(params)
            this.setState({
                update: params.update,
                id: params.estabeblishment.id,
                name: params.estabeblishment.name,
                street: params.estabeblishment.street,
                number: String(params.estabeblishment.number),
                neighborhood: params.estabeblishment.neighborhood,
                city: params.estabeblishment.city,
                state: params.estabeblishment.state,
                latitude: params.estabeblishment.latitude,
                longitude: params.estabeblishment.longitude,
                loading: false,
                token,
                location: params.location
            })
        } else {
            this.setState({ token })
        }
    }

    addedEstablishment = async () => {
        this.setState({ loading: true })
        if (this.state.update == false) {
            const url = urls.base + urls.estabeblishment
            const { name, street, number, neighborhood, city, state } = this.state

            const body = {
                name,
                street,
                number: parseInt(number),
                neighborhood,
                city,
                state
            }

            api.PostRequestWithToken(url, body)
                .then((response) => {
                    console.log(response)
                    if (response.data.success) {
                        this.setState({ loading: false })
                        alert("Estabelecimento cadastrado com sucesso!!!")
                        this.props.navigation.navigate("Home")
                    } else {
                        this.setState({ loading: false })
                        alert(response.data.message)
                    }
                })
        } else {

            const url = urls.base + urls.estabeblishment + String(this.state.id) + '/'
            console.log(url)
            const { name, street, number, neighborhood, city, state, latitude, longitude } = this.state

            const body = {
                name,
                street,
                number: parseInt(number),
                neighborhood,
                city,
                state,
                latitude,
                longitude
            }

            axios({
                method: "PUT",
                url,
                data: body,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + this.state.token
                },
            })
                .then(async response => {
                    this.setState({ loading: false })
                    await this.props.GET_ESTABLISHMENT(this.state.location)
                    alert("Estabelecimento atualizado com sucesso!!!")
                    this.props.navigation.navigate("Home")

                })
        }
    }

    render() {
        return (
            <View style={styles.container} >
                {this.state.loading ? (
                    <LoadingSpiner />
                )
                    :
                    (
                        <>
                            <ScrollView style={{ flex: 1 }} >
                                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled keyboardVerticalOffset={300}>
                                    <DefalutTextInput
                                        placeholder={"Nome"}
                                        value={this.state.name}
                                        onChange={name => this.setState({ name })}
                                    />
                                    <DefalutTextInput
                                        placeholder={"Rua"}
                                        value={this.state.street}
                                        onChange={street => this.setState({ street })}
                                    />
                                    <DefalutTextInput
                                        placeholder={"Rumero"}
                                        value={this.state.number}
                                        onChange={number => this.setState({ number })}
                                    />
                                    <DefalutTextInput
                                        placeholder={"Bairro"}
                                        value={this.state.neighborhood}
                                        onChange={neighborhood => this.setState({ neighborhood })}
                                    />
                                    <DefalutTextInput
                                        placeholder={"Cidade"}
                                        value={this.state.city}
                                        onChange={city => this.setState({ city })}
                                    />
                                    <DefalutTextInput
                                        placeholder={"Estado"}
                                        value={this.state.state}
                                        onChange={state => this.setState({ state })}
                                    />

                                    <DefaultButton
                                        title={"Salvar"} disabled={this.state.clicable}
                                        onPress={() => this.addedEstablishment()}
                                    />
                                </KeyboardAvoidingView>
                            </ScrollView>
                        </>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.mainWhite,
    }
})
const mapDispatchToProps = dispatch => bindActionCreators({ GET_ESTABLISHMENT }, dispatch)

export default connect(null, mapDispatchToProps)(RegisterEstablishmentScreen)
