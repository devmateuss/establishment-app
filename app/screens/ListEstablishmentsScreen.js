import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Platform,
    ActivityIndicator,
    AsyncStorage,
    TouchableOpacity,
    Dimensions,
    Modal,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


import colors from '../constrants/colors'
import { Card, DefalutTextInput, DefaultButton } from '../components'
import * as api from '../api'
import urls from '../constrants/urls'
import { ADD_ESTABLISHMENT } from '../actions/establishmentAction'

var { width, height } = Dimensions.get("window")

class ListEstablishmentsScreen extends Component {
    state = {
        establishments: [],
        loading: true,
        changeFance: false,
        fance: null,
        location: null
    }

    componentWillMount = async () => {
        var token = await AsyncStorage.getItem("user-token")
        var fance = await AsyncStorage.getItem("fance")

        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this.setState({ token, fance: parseInt(fance) })
            this._getLocationAsync();
        }

    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location }, () => this.getEstablisiments(location))
    };

    getEstablisiments = async (location) => {
        const url = urls.base + urls.list_estabeblishment
        const body = {
            latitude: parseFloat(location.coords.latitude.toFixed(7)),
            longitude: parseFloat(location.coords.longitude.toFixed(7)),
            fance: parseInt(this.state.fance)
        }
        try {

            let response = await api.PostRequestWithToken(url, body, this.state.token)
            this.setState({
                loading: false,
                establishments: response.data
            }, () => this.props.ADD_ESTABLISHMENT(response.data))
        } catch (e) {
            console.log("Erro na comunicação com o servidor")
            this.setState({ loading: false })
        }
    }

    setFance = (fance) => {
        AsyncStorage.setItem('fance', fance)
            .then(() => {
                this.getEstablisiments(this.state.location)
                this.setState({ changeFance: false }, () => alert("Raio alterado com sucesso!!"))
            })
    }

    render() {
        return (
            <View style={styles.container} >
                {
                    this.state.loading ? (
                        <View style={{
                            flex: 1,
                            justifyContent: 'center'
                        }}>
                            <ActivityIndicator size="large" color={colors.mainGray} />
                        </View>
                    ) : (
                            <View style={{ flex: 1, width, alignItems: "center" }} >
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        top: 10,
                                        right: width * .87
                                    }}
                                    onPress={() => this.setState({ changeFance: true })}
                                >
                                    <Icon
                                        name='bullseye'
                                        type='font-awesome'
                                        color={colors.mainGray}
                                        size={50}
                                        iconStyle={{

                                        }}
                                    />
                                </TouchableOpacity>
                                <ScrollView >
                                    {

                                        this.state.establishments.map(estabeblishment => (
                                            <Card
                                                onPress={() => this.props.navigation.navigate("Added", { estabeblishment, update: true, location: this.state.location })}
                                                key={estabeblishment.id}
                                                title={estabeblishment.name}
                                                adress={estabeblishment.street + ', ' + estabeblishment.number + ' - ' + estabeblishment.neighborhood}
                                            />
                                        ))
                                    }
                                </ScrollView>
                            </View>
                        )
                }
                <Modal
                    visible={this.state.changeFance}
                    nimationType="fade"
                >
                    <TouchableWithoutFeedback onPress={() => this.setState({ changeFance: false })} >
                        <View style={{ flex: 1, backgroundColor: 'transparent' }} ></View>
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                        <KeyboardAvoidingView style={{ justifyContent: "center", alignItems: "center" }} behavior="padding" enabled>
                            <DefalutTextInput
                                value={String(this.state.fance)}
                                placeholder={'Tamanho do Raio'}
                                onChange={fance => this.setState({ fance })}
                            />
                            <DefaultButton
                                title={'Salvar'}
                                onPress={() => this.setFance(this.state.fance)}
                            />
                            <DefaultButton
                                title={'Cancelar'}
                                onPress={() => this.setState({ changeFance: false })}
                            />
                        </KeyboardAvoidingView>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.setState({ changeFance: false })} >
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
        alignItems: "center",
        justifyContent: "center"
    }
})

const mapStateToProps = state => ({
    establishments: state.establishmentReducer
})
const mapDispatchToProps = dispatch => bindActionCreators({ ADD_ESTABLISHMENT }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListEstablishmentsScreen)
