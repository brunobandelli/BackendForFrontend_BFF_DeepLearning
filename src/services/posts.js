const { Client } = require('undici')

class PostsService {
    #client;

    constructor() {
        this.#client = new Client('http://localhost:3001');
    }

    /**
     * 
     * @param {number} limit 
     */

     async getPosts(limit = 2) {
            const response = await this.#client.request({
                method: 'GET',
                path: '/posts',
            })

            const data = await response.body.json();

            const posts = []

            for (const post of data ){
                if(posts.length >= limit ) continue;

                posts.push({
                    id: post.id,
                    title: post.title,
                })
            }

            return posts;
        }
}

module.exports = PostsService