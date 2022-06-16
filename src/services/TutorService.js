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
    },
    createTutor(tutor, id) {
        const mutation = `
        mutation($tutor:InputTutor, $userid:Int){
            createTutor(tutor:$tutor, userid:$userid){
                id
                profileImg
                description
                students{
                    user{
                        firstname
                        lastname
                        displayname
                    }
                }
                subjects{
                    name
                    category{
                        name
                    }
                }
                preferences{
                    name
                }
                user{
                    firstname
                    lastname
                    displayname
                    email
                }
            }
        }
        `
        const variable = {
            tutor: tutor,
            userid: id
        }

        const graphql = {
            query: mutation,
            variables: variable
        }
        return graphqlClient(graphql)
    }
}