import graphqlClient from "./GraphQLClient.js";

export default {
    getPendingRequestTutor(pageNo, pageSize, id) {
        const query = `
        query($query:QueryFilter, $tutorid:Int){
            getRequestsTutorSide(queryFilter:$query, tutorid:$tutorid){
                totalElements
                content{
                    id
                    message
                    reply
                    status
                    student{
                        profileImg
                        user{
                            firstname
                            lastname
                            displayname
                        }
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
            tutorid: id
        }
        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    getRequestReceived(id) {
        const query = `
        query($requestid:Int){
            getRequest(requestid:$requestid){
                    id
                    message
                    reply
                    tutor{
                        profileImg
                        user{
                            firstname
                            lastname
                            displayname
                        }
                    }
                    student{
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
            requestid: id
        }
        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    acceptRequest(reply, id) {
        const query = `
        mutation($request:SendReply){
            acceptRequest(request:$request){
                message
                reply
                status
                student{
                    user{
                        displayname
                    }
                }
                tutor{
                    user{
                        displayname
                    }
                }
            }
        }
        `
        const variable = {
            request: {
                id: id,
                reply: reply
            }
        }
        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    refuseRequest(reply, id) {
        const query = `
        mutation($request:SendReply){
            rejectRequest(request:$request){
                message
                reply
                status
                student{
                    user{
                        displayname
                    }
                }
                tutor{
                    user{
                        displayname
                    }
                }
            }
        }
        `
        const variable = {
            request: {
                id: id,
                reply: reply
            }
        }
        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    sendRequest(tutorid, studentid, text) {
        const query = `
        mutation($tutorid:Int, $studentid:Int, $request:SendRequest){
            sendRequest(tutorid:$tutorid, studentid:$studentid, request:$request){
                message
                reply
                status
                student{
                    user{
                        firstname
                        lastname
                        displayname
                    }
                }
                tutor{
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
            tutorid: tutorid,
            studentid: studentid,
            request: {
                message: text
            }
        }
        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    getRequestStudent(pageNo, pageSize, id) {
        const query = `
        query($query:QueryFilter, $studentid:Int){
            getRequestsStudentSide(queryFilter:$query, studentid:$studentid){
                totalElements
                content{
                    id
                    message
                    reply
                    status
                    tutor{
                        profileImg
                    user{
                        firstname
                        lastname
                        displayname
                    }
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
            studentid: id
        }
        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    }


}