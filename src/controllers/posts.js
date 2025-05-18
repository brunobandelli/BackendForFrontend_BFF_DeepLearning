const PostsService = require("../services/posts");

const postsService = new PostsService()

class PostsController {
    async getPosts(){
       const posts = await postsService.getPosts()
       return posts
    }

/**
 * @param {number} id
 */

async getPost (id){
    return {
        id,
        name: 'Test'
    }

}

}

module.exports = PostsController

