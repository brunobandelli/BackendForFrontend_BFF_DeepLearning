const { Client } = require('undici')

class UsersService {
    #client;

    constructor() {
        this.#client = new Client('http://localhost:3003');
    }
    
    /**
     * @param {number} ids 
     */

     async getUsers(ids) {
            const response = await this.#client.request({
                method: 'GET',
                path: '/users',
                query: { id: ids }
            })

            const data = await response.body.json();

            const users = new Map()

            for (const comment of data) {
                users.set(comment.id, comment.name)
            }

            return users;
        }
}
    
module.exports = UsersService