const Http = require("../utils/http");
const CircuitBreaker = require('opossum')

class CommentsService {
    #client;
    #cbGetComments

    constructor() {
        this.#client = new Http('http://localhost:3002');
        this.#cbGetComments = new CircuitBreaker(async (postId, limit=5) => {
            const data = await this.#client.request({
                method: 'GET',
                path: '/comments',
                query: {postId}
            }, {
                timeout: 5000,
            })

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
        }, {
            timeout: 1000,
            errorThresholdPercentage: 10,
            resetTimeout: 10000,
        })
        this.#cbGetComments.fallback(() => {
            return []
        })
    }
    
    /**
     * @param {number} postId 
     * @param {number} limit
     */

     async getComments(postId, limit = 5) {
            const { rejects, failures, fallbacks, successes} = this.#cbGetComments.stats;
            console.log({ rejects, failures, fallbacks, successes });
            return this.#cbGetComments.fire(postId, limit)
        }
}
    
module.exports = CommentsService