const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (req, resp) => {
    Blog.find({}).then((blogs) => {
        resp.json(blogs);
    });
});

blogsRouter.post('/', (req, resp) => {
    const blog = new Blog(req.body)

    blog.save().then(result => {
        resp.status(201).json(result)
    })
})

module.exports= blogsRouter