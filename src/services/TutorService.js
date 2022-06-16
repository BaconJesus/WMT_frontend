import graphqlClient from "./GraphQLClient.js";

export default {
    getTutors(pageNo, pageSize) {
        const query = `
        query($query:QueryFilter){
            getTutors(queryFilter:$query){
                totalElements
                content{
                    id
                    profileImg
                    user{
                            firstname
                            lastname
                            displayname
                    }
                }
            }
        }
        `
        const variable = {
            query: {
                pageNo: pageNo,
                pageSize: pageSize
            }
        }

        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    }
}