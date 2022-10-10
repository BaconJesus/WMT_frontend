import graphqlClient from "./GraphQLClient.js";

export default {
    updatePost(tutorid, post) {
        const query = `
        mutation($post:InputPosts, $tutorid:Int){
            updatePost(tutorid:$tutorid, post:$post){
                id
                description
                status
                lastOpened
                tutor{
                    rewardPoints
                    profileImg
                    user{
                        displayname
                    }
                }
            }
        }
        `
        const variable = {
            tutorid: tutorid,
            post: {
                description: post,
            }
        }

        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    closePost(id, post) {
        const query = `
        mutation($post:InputPosts){
            closePost(post:$post){
                id
                description
                status
                lastOpened
                tutor{
                    profileImg
                    user{
                        displayname
                    }
                }
            }
        }
        `
        const variable = {
            post: {
                id: id,
                description: post,
            }
        }

        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    },
    getPosts(page) {
        const query = `
        query($query:QueryFilter){
            getPosts(queryFilter:$query){
                totalElements
                content{
                    id
                    description
                    status
                    lastOpened
                    tutor{
                        id
                        profileImg
                        user{
                            displayname
                        }
                    }
                }
            }
        }
        `
        const variable = {
            query: {
                pageSize: 5,
                pageNo: page,
            }
        }

        const graphql = {
            query: query,
            variables: variable
        }
        return graphqlClient(graphql)
    }
}