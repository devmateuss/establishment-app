import axios from 'axios'

export const PostRequest = async (url, body) => {

    return new Promise((resolve, reject) => {
        if (!url) reject("No URL")

        console.log(body)
        axios({
            method: "POST",
            url,
            data: body,
            headers: { 'Content-Type': 'application/json' },
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