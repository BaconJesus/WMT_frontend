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
    checkhasRoles(user, roles) {
        if (user && roles) {
            let setRoles = []
            for (var x = 0; x < user.user.authorities.length; x++) {
                setRoles.push(user.user.authorities[x].name)
            }
            let containRoles = setRoles.includes(roles)

            return containRoles
        } else {
            return false
        }
    },
    hasTutor(id) {
        if (GStore.currentUser.student && id) {
            let setTutors = []
            for (var x = 0; x < GStore.currentUser.student.tutors.length; x++) {
                setTutors.push(GStore.currentUser.student.tutors[x].id)
            }
            let containTutors = setTutors.includes(id)

            return containTutors
        } else {
            return false
        }
    },
    hasReviewed(review) {
        if (GStore.currentUser.student && review) {
            console.log(review)
            console.log(GStore.currentUser.student)
            let setReviews = []
            for (var x = 0; x < review.length; x++) {
                setReviews.push(review[x].student.id)
            }
            let containReviews = setReviews.includes(GStore.currentUser.student.id)
            console.log(setReviews)
            return containReviews
        } else {
            return false
        }
    }
}