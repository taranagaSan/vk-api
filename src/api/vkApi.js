import jsonp from 'jsonp'
import {
    mapFriends
} from '@/utils/helpers'

const getUserInfo = url => (
    new Promise((resolve, reject) => {
        jsonp(url, null, (err, data) => {
            if (err) {
                reject(err)
            } else {
                const [user] = data.response

                resolve(user)
            }
        })
    })
)

const getFriends = (url, id) => (
    new Promise((resolve, reject) => {
        jsonp(url, null, (err, data) => {
            if (err) {
                reject(err)
            } else {
                const friends = mapFriends({
                    ...data.response,
                    id
                })

                resolve(friends)
            }
        })
    })
)

const getPosts = url => (
    new Promise((resolve, reject) => {
        jsonp(url, null, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.response.items)
            }
        })
    })
)

export {
    getUserInfo,
    getFriends,
    getPosts
}
