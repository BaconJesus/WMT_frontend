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
    },
    getTutor(id) {
        const query = `
        query($id:Int){
            getTutor(id:$id){
                id
                description
                profileImg
                active
                overallRating
                rewardPoints
                students{
                    id
                    profileImg
                    user{
                        firstname
                        lastname
                        displayname
                    }
                }
                reviews{
                    description
                    rating
                    student{
                        id
                        profileImg
                        user{
                            displayname
                        }
                    }
                }
                subjects{
                    id
                    name
                    category{
                        name
                    }
                }
                preferences{
                    id
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
            id: id
        }

        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    editTutor(tutor, id) {
        const mutation = `
        mutation($tutor:InputTutor, $id:Int){
            editTutor(tutor:$tutor, id:$id){
                id
                profileImg
                description
                students{
                    user{
                        firstname
                        displayname
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
            }
        }
        `
        const variable = {
            tutor: tutor,
            id: id
        }

        const graphql = {
            query: mutation,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    getTutorToEdit(id) {
        const query = `
        query($id:Int){
            getTutor(id:$id){
                id
                description
                profileImg
                subjects{
                    id
                }
                preferences{
                    id
                }
            }
        }
        `
        const variable = {
            id: id
        }

        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    deleteTutor(id) {
        const mutation = `
        mutation($id:Int){
            deleteTutor(id:$id){
                id
                active
                user{
                    firstname
                    lastname
                    displayname
                }
            }
        }
        `
        const variable = {
            id: id
        }

        const graphql = {
            query: mutation,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    undeleteTutor(id) {
        const mutation = `
        mutation($id:Int){
            undeleteTutor(id:$id){
                id
                active
                user{
                    firstname
                    lastname
                    displayname
                }
            }
        }
        `
        const variable = {
            id: id
        }

        const graphql = {
            query: mutation,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    searchByName(name, pageNo, pageSize) {
        const query = `
        query($query:QueryFilter, $name:String){
            getMatchTutorPaginationByName(queryFilter:$query, name:$name){
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
            },
            name: name
        }

        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    searchByPref(subjId, prefId, pageNo, pageSize) {
        const query = `
        query($query:QueryFilter, $preference:InputPreference, $subject:InputSubject){
            getMatchTutorPaginationByStudentInput(queryFilter:$query, preference:$preference, subject:$subject){
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
            },
            subject: {
                id: subjId
            },
            preference: {
                id: prefId
            }
        }

        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    }
}