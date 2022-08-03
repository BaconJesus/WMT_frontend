import graphqlClient from "./GraphQLClient.js";

export default {
    getCategories() {
        const query = `
        query{
            getCategories{
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