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
                rewardPoints
                profileImg
                active
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
    },
    editStudent(student, id) {
        const mutation = `
        mutation($student:InputStudent, $id:Int){
            editStudent(student:$student, id:$id){
                id
                profileImg
                description
            }
        }
        `
        const variable = {
            student: student,
            id: id
        }

        const graphql = {
            query: mutation,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    deleteStudent(id) {
        const mutation = `
        mutation($id:Int){
            deleteStudent(id:$id){
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
    undeleteStudent(id) {
        const mutation = `
        mutation($id:Int){
            undeleteStudent(id:$id){
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
    getStudentRanking() {
        const query = `
        query{
            getRankedStudents{
                id
                profileImg
                rewardPoints
                user{
                    displayname
                    authorities{
                        name
                    }
                }
            }
        }
        `

        const graphql = {
            query: query,
        }
        return graphqlClient(graphql)
    }
}