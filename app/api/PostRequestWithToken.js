import axios from 'axios'
import { AsyncStorage } from 'react-native'

export const PostRequestWithToken = async (url, body, token) => {

    var token = await AsyncStorage.getItem("user-token")

    return new Promise((resolve, reject) => {
        if (!url) reject("No URL")
        axios({
            method: "POST",
            url,
            data: body,
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