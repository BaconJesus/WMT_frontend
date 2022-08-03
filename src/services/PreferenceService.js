import graphqlClient from "./GraphQLClient.js";

export default {
    getPreferences() {
        const query = `
        query{
            getPreferences{
              id
              name
            }
        }
        `
        const graphql = {
            query: query
        }
        return graphqlClient(graphql)
    }
}