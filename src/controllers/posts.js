const CommentsService = require("../services/comments");
const PostsService = require("../services/posts");
const UsersService = require("../services/users");

const postsService = new PostsService()
const commentsService = new CommentsService()
const usersService = new UsersService()
class PostsController {
    async getPosts(){
       const posts = await postsService.getPosts()

       const authorIds = new Set();
        for(const post of posts){
            authorIds.add(post.authorId)
        }

        const users = await usersService.getUsers([...authorIds])

        for(const post of posts){
            post.author = users.get(post.authorId);
            post.authorId = undefined
        }

        console.log(posts)

       return posts
    }

/**
 * @param {number} id
 */

async getPost (id){
    //Fetch data
    const [post, comments] = await Promise.all([
        postsService.getPost(id),
        commentsService.getComments(id)
    ])

    //Mount user ids
    const userIds = new Set([post.authorId]);
    for (const comment of comments) {
        userIds.add(comment.userId)
    }

    //Fetch users
    const users = await usersService.getUsers([...userIds])

    //Transform user data
    post.author = users.get(post.authorId);
    for (const comment of comments){
        comment.user = users.get(comment.userId)
        comment.userId = undefined;
    }

    console.log({users})

    return {
        ...post,
        authorId: undefined,
        comments
    }
}

async 

}

module.exports = PostsController

