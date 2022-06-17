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
    },
    createStudent(student, id) {
        const mutation = `
        mutation($student:InputStudent, $userid:Int){
            createStudent(student:$student, userid:$userid){
                id
                profileImg
                description
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
            student: student,
            userid: id
        }

        const graphql = {
            query: mutation,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    getStudent(theid) {
        const query = `
        query($id:Int){
            getStudent(id:$id){
                id
                description
                profileImg
                tutors{
                    user{
                        firstname
                        lastname
                        displayname
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
            id: theid
        }

        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    getUpdatedProfilePic(id) {
        const query = `
        query($id:Int){
            getStudent(id:$id){
                profileImg
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