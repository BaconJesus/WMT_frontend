import graphqlClient from "./GraphQLClient.js";

export default {
    getQuestions(pageNo, pageSize, id) {
        const query = `
        query($query:QueryFilter, $categoryid:Int){
            getQuestions(categoryid:$categoryid, queryFilter:$query){
                totalElements
                content{
                    id
                    title
                    description
                    student{
                        profileImg
                        user{
                            displayname
                        }
                    }
                    category{
                        name
                    }
                    status
                }
            }
        }
        `
        const variable = {
            query: {
                pageNo: pageNo,
                pageSize: pageSize
            },
            categoryid: id
        }

        const graphql = {
            query: query
        }
        return graphqlClient(graphql)
    },
    askQuestion(question, id) {
        const query = `
        mutation($question:InputQuestion, $studentid:Int){
            askQuestion(studentid:$studentid, question:$question){
                id
                title
                description
                student{
                    user{
                        firstname
                        lastname
                        displayname
                    }
                }
                category{
                    name
                }
            }
        }
        `
        const variable = {
            question: question,
            studentid: id
        }

        const graphql = {
            query: query
        }
        return graphqlClient(graphql)
    }
}