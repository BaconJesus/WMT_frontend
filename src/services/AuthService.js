import apiClient from '@/services/AxiosClient.js'
export default {
    getEvents(perPage, page) {
        return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
    },
}