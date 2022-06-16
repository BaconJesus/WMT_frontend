import graphqlClient from "./GraphQLClient.js";

export default {
    getStudents(pageNo, pageSize) {
        const query = `
        query($query:QueryFilter){
            getStudents(queryFilter:$query){
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