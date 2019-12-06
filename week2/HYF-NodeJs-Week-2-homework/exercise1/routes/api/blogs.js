const express = require('express');
const router = express.Router();
const blogs = require('../../blogs-info');
const fs = require('fs');
const path = require('path');

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

    fs.readFile(path.join('blogs-info.json'), (err, data) => {
        if (err) throw err;
        var json = JSON.parse(data);
        json.push(newBlog);
        fs.writeFile(path.join('blogs-info.json'), JSON.stringify(json), err => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    })
    res.json({ blogs, msg: 'Blog added' });
});
// Update a blog
router.put('/:title', (req, res) => {

    const title = req.params.title;
    const blogToUpdate = blogs.find(item => item.title === title);

    if (typeof blogToUpdate == 'undefined') {
        res.status = 404;
        res.send('No such book');
        return;
    }

    blogToUpdate.title = req.body.title;
    blogToUpdate.content = req.body.content;
    res.send('ok')

});
// Delete blog
router.delete('/:title', (req, res) => {

    const title = req.params.title;

    const blogToDelete = blogs.find(blog => blog.title === title);
    if (typeof blogToDelete == 'undefined') {
        res.status = 404;
        res.send('No such book');
        return;
    }
    blogs.splice(blogs.indexOf(blogToDelete), 1);
    res.send('Blog deleted')

});
module.exports = router;