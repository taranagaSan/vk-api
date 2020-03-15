import { ToastProgrammatic as Toast } from 'buefy'
import jsonp from 'jsonp'
import Vue from 'vue'
import Vuex from 'vuex'
import { User } from '@/utils/classes'
import {
    checkUser,
    checkUserById,
    findUserIndex,
    mapFriends,
    getFriendsList,
    getUsersCount
} from '@/utils/helpers'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        userId: null,
        users: [],
        isLoading: false,
        friends: null,
        usersFriendsList: [],
        checkedFriend: null,
        friendPosts: null,
        maxCount: 0
    },
    mutations: {
        setUserId({ state }, payload) {
            this.state.userId = payload
        },
        setLoading({ state }, isLoading) {
            this.state.isLoading = isLoading
        },
        setUser({ state }, user) {
            this.state.user = new User(user)
            this.state.isLoading = false
        },
        addUser({ state }, user) {
            const isUserInUsers = !!checkUser(this.state.users, user)

            if (!isUserInUsers) {
                user.inList = true
                this.state.users.push(user)

                Toast.open({
                    message: 'Пользователь ВК добавлен',
                    duration: 2000,
                    type: 'is-success'
                })
            }
            this.state.user = null
            this.state.userId = ''
        },
        removeUser({ state }, user) {
            const index = findUserIndex(this.state.users, user)

            this.state.users.splice(index, 1)

            Toast.open({
                message: 'Пользователь ВК удален',
                duration: 2000,
                type: 'is-success'
            })

            this.state.user = null
            this.state.userId = ''
        },
        changeUserData({ state }, friends) {
            this.state.friends = friends
        },
        setIsChecked({ state }, { index, isChecked }) {
            this.state.users[index].isChecked = isChecked
        },
        setError({ state }, err) {
            this.state.error = err
        },
        setCheckedFriend({ state }, data) {
            this.state.checkedFriend = data
        },
        addUsersFriendsList({ state }) {
            const checkedUsers = this.state.users.filter(user => user.isChecked === true)

            this.state.usersFriendsList = getFriendsList(checkedUsers)
            this.state.maxCount = getUsersCount(this.state.usersFriendsList)
        },
        setPost({ state }, posts) {
            this.state.friendPosts = posts
        }
    },
    actions: {
        async findUserById({ state, commit, dispatch }) {
            commit('setLoading', true)

            const userInUsers = checkUserById(state.users, state.userId)

            if (userInUsers) {
                state.user = userInUsers
                commit('setLoading', false)

                return
            }

            const params = {
                url: 'https://api.vk.com/method/users.get',
                user_id: state.userId,
                fields: 'sex,bdate,counters',
                access_token: '8d43ef27eeadc300132554f53391052862a479b959acfdd6128c50c9a42fc709932e8f07ff90e466adcf6',
            }

            const url = `${params.url}?user_id=${params.user_id}&fields=${params.fields}&access_token=${params.access_token}&v=5.52`

            const getUserInfo = () => (
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

            try {
                const user = await getUserInfo()

                await dispatch('getUsersFriends', user.id)

                commit('setUser', {
                    ...user,
                    friends: state.friends
                })
            } catch (err) {
                console.log(err)
            }
        },
        getUsersFriends({ commit }, id) {
            const params = {
                url: 'https://api.vk.com/method/friends.search',
                user_id: id,
                count: '50',
                access_token: '8d43ef27eeadc300132554f53391052862a479b959acfdd6128c50c9a42fc709932e8f07ff90e466adcf6',
                v: 5.52
            }

            const url = `${params.url}?user_id=${params.user_id}&count=${params.count}&access_token=${params.access_token}&v=5.52`

            return new Promise((resolve, reject) => {
                jsonp(url, null, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        const friends = mapFriends({
                            ...data.response,
                            id
                        })

                        commit('changeUserData', friends)

                        resolve(friends)
                    }
                })
            })
        },
        async getWallPosts({ commit }, id) {
            const params = {
                url: 'https://api.vk.com/method/wall.get',
                user_id: id,
                count: '10',
                access_token: '8d43ef27eeadc300132554f53391052862a479b959acfdd6128c50c9a42fc709932e8f07ff90e466adcf6'
            }

            const url = `${params.url}?owner_id=${params.user_id}&count=${params.count}&access_token=${params.access_token}&v=5.52`

            const getPosts = () => (
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

            try {
                const posts = await getPosts()

                commit('setPost', posts)
            } catch (err) {
                console.log(err)
            }
        }
    }
})
