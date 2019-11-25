const express = require('express');
const router = express.Router();
const blogs = require('../../blogs-info');

// get blogs
router.get('/', (req, res) => {
    res.json(blogs)
});
// if you need to get one blog 
router.get('/:title', (req, res) => {
    const found = blogs.some(item => item.title === req.params.title);
    if (found) {
        res.send(blogs.filter(item => item.title === req.params.title))
    } else {
        res.status(400).json({ msg: `No blog with the title of ${req.params.title}` });
    }

});
// create Blog
router.post('/', (req, res) => {

    const newBlog = {
        title: req.body.title,
        content: req.body.content,

    };

    if (!newBlog.title || !newBlog.content) {
        return res.status(400).json({ msg: 'Please include a title and contant' });
    }

    blogs.push(newBlog);
    res.json({ blogs, msg: 'Blog added' });

});
// Update a blog
router.put('/:title', (req, res) => {
    const found = blogs.some(item => item.title === req.params.title);
    if (found) {
        const updateBlog = req.body;
        blogs.forEach(blog => {
            if (blog.title === req.params.title) {
                blog.title = updateBlog.title ? updateBlog.title : blog.title;
                blog.content = updateBlog.content ? updateBlog.content : blog.content;
                res.send(blog)
                res.json({ msg: 'Blog updated', blog })
            } else {
                res.status(400)
                res.json({ msg: `No blog with the id of ${req.params.id}` });
            }
        });
    } else {
        res.status(400);
        res.json({ msg: `No blog with the title of ${req.params.title}` });
    }
});
// Delete blog
router.delete('/:title', (req, res) => {
    const found = blogs.some(item => item.title === req.params.title);
    if (found) {
        res.send({ msg: 'Blog deleted', blogs: blogs.filter(item => item.title !== req.params.title) })
    } else {
        res.status(400).json({ msg: `No blog with the title of ${req.params.title}` });
    }

});
module.exports = router;