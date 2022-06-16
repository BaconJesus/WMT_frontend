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
    },
    registerTutor(user) {
        return apiClient
            .post('/register/tutor', {
                username: user.username,
                password: user.password,
                email: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                displayname: user.displayname
            })
    },
    registerStudent(user) {
        return apiClient
            .post('/register/student', {
                username: user.username,
                password: user.password,
                email: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                displayname: user.displayname
            })
    },
    getUser() {
        return localStorage.getItem('user')
    },
    hasRoles(roles) {
        if (GStore.currentUser && roles) {
            let setRoles = []
            for (var x = 0; x < GStore.currentUser.authorities.length; x++) {
                setRoles.push(GStore.currentUser.authorities[x].name)
            }
            let containRoles = setRoles.includes(roles)

            return containRoles
        } else {
            return false
        }
    },
}