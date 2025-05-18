const fastify = require('fastify');
const PostsController = require('./controllers/posts')

const app = fastify({
    logger: true,
})

const postsController = new PostsController()

app.get('/posts', async (req,reply) => {
    const posts = await postsController.getPosts()
    return reply.send(posts)
});

app.get('/post/:id',async (req,reply) => {
    const id = req.params.id;
    const post = await postsController.getPost(id)
    return reply.send(post)
});

app.listen({port: 3000}, (err, address) => {
    if(err) throw err;
    console.log('Running!');
})