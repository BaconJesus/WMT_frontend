import graphqlClient from "./GraphQLClient.js";

export default {
    getSubjects(id) {
        const query = `
        query($categoryid:Int){
            getSubjects(categoryid: $categoryid){
              id
              name
            }
        }
        `
        const variable = {
            categoryid: id
        }
        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    }
}