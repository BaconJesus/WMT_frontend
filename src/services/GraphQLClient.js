import axios from 'axios'
const graphqlAxios = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,

    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

const graphqlClient = (query) => {
    return graphqlAxios.post('/graphql', query)
}
export default graphqlClient