const { Client } = require('undici')

class CommentsService {
    #client;

    constructor() {
        this.#client = new Client('http://localhost:3002');
    }
    
    /**
     * @param {number} postId 
     * @param {number} limit
     */

     async getComments(postId, limit = 5) {
            const response = await this.#client.request({
                method: 'GET',
                path: '/comments',
                query: {postId}
            })

            const data = await response.body.json();

            const comments = []

            for (const comment of data) {
                if (comments.length >= limit)continue

                comments.push({
                    id: comment.id,
                    text: comment.text,
                    userId: comment.userId,
                })
            }

            return comments;
        }
}
    
module.exports = CommentsService