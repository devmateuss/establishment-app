import * as api from '../api'
import urls from '../constrants/urls'
import { AsyncStorage } from 'react-native'

export const ADD_ESTABLISHMENT = (establishment) => (
    { type: 'ADD_ESTABLISHMENT', establishment }
)

export const GET_ESTABLISHMENT = (location) => {
    return async dispatch => {

        var token = await AsyncStorage.getItem("user-token")
        // var fance = await AsyncStorage.getItem("fance")

        const url = urls.base + urls.list_estabeblishment
        const body = {
            latitude: parseFloat(location.coords.latitude.toFixed(7)),
            longitude: parseFloat(location.coords.longitude.toFixed(7)),
            fance: 1000
        }
        console.log(body)

        let response = await api.PostRequestWithToken(url, body, token)

        dispatch({ type: 'ADD_ESTABLISHMENT', establishment: response.data })
    }
}