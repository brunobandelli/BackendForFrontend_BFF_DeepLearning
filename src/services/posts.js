const CircuitBreaker = require('opossum')
const Http = require('../utils/http');

class PostsService {
    #client;
    #cbGetPosts;
    #cbGetPost;

    constructor() {
        this.#client = new Http('http://127.0.0.1:3001');
        this.#cbGetPosts = new CircuitBreaker(async (limit) => {
            const data = await this.#client.request({
                method: 'GET',
                path: '/posts',
            }, {
                timeout: 5000,
            })

            const posts = []

            for (const post of data ){
                if(posts.length >= limit ) continue;

                posts.push({
                    id: post.id,
                    authorId: post.authorId,
                    title: post.title,
                })
            }


            return posts;
        }, {
            timeout: 1000,
            errorThresholdPercentage: 90,
        });
        this.#cbGetPosts.fallback(() => [])
        this.#cbGetPost = new CircuitBreaker(async (id) => {
            const data = await this.#client.request({
                method: 'GET',
                path: `/posts/${id}`,
            }, {
                timeout: 5000,
            })

            return {
                id: data.id,
                title: data.title,
                text: data.text,
                authorId: data.authorId,
            };
        },{
            timeout: 1000,
            errorThresholdPercentage: 90,
        })
        this.#cbGetPost.fallback(() => ({}))
    }
    
    /**
     * @param {number} limit 
     */

     async getPosts(limit = 5) {
            return this.#cbGetPosts.fire(limit)
        }


     /**
     * @param {number} id 
     */

     async getPost(id) {
            return this.#cbGetPost.fire(id)
        }
}
    
module.exports = PostsService