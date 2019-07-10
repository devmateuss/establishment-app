import axios from 'axios'
import { AsyncStorage } from 'react-native'


export const GetRequest = async (url) => {

    var token = await AsyncStorage.getItem("user-token")

    return new Promise((resolve, reject) => {
        if (!url) reject("No Url")

        console.log('Token ' + token)
        axios({
            method: "GET",
            url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
        }).then(response => {
            resolve({
                success: true,
                data: response.data,
                error: null
            })
        }).catch(error => {
            reject({
                success: false,
                error
            })
        })

    })
}