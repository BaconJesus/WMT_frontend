import apiClient from '@/services/AxiosClient.js'
import GStore from '@/store'
export default {
    login(user) {
        return apiClient
            .post('/auth', {
                username: user.username,
                password: user.password
            })
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                    // localStorage.setItem('profileimg', response.data.user.profileImg)
                    // localStorage.setItem('displayname', response.data.user.displayname)
                    // localStorage.setItem('fullname', response.data.user.firstname + ' ' + response.data.user.lastname)
                GStore.currentUser = response.data.user
                return Promise.resolve(response.data)
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    },
    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        GStore.currentUser = null
        GStore.currentFirstname = null
        GStore.currentLastname = null
        GStore.currentDisplayname = null
    },
    getUser() {
        return localStorage.getItem('user')
    }
}