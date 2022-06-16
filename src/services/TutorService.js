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

    getTutor(id){
        const query = `
        query($id:Int){
            getTutor(id:$id){
                id
                description
                profileImg
                overallRating
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
                reviews{
                    description
                    rating
                    student{
                        user{
                            displayname
                        }
                    }
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
            query: {
                id: id
            }
        }

        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
        }
    }
