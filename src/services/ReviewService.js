import graphqlClient from "./GraphQLClient.js";

export default {
    sendReview(review, rating, studentid, tutorid) {
        const query = `
        mutation($tutorid:Int, $studentid:Int, $review:InputReview){
            writeReview(tutorid:$tutorid, studentid:$studentid, review:$review){
                id
                description
                profileImg
                overallRating
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
                }
            }
        }
        `
        const variable = {
            tutorid: tutorid,
            studentid: studentid,
            review: {
                description: review,
                rating: rating
            }
        }

        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    }
}