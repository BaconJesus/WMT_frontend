import { reactive } from 'vue'
export default reactive({
    flashMessage: '',
    currentUser: JSON.parse(localStorage.getItem('user'))
})