const express = require('express');
const router = express.Router();
const blogs = require('../../blogs-info');
const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

// get blogs
router.get('/', (req, res) => {
    fs.readFile(path.join('blogs-info.json'), (err, result) => {
        if (err) throw err;
        const data = JSON.parse(result)
        res.json(data)
    })

});
// if you need to get one blog 
router.get('/:id', (req, res) => {
    const found = blogs.some(item => item.id === parseInt(req.params.id));
    if (found) {
        res.send(blogs.filter(item => item.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `No blog with the title of ${parseInt(req.params.id)}` });
    }

});
// create Blog
router.post('/', (req, res) => {
    const newBlog = {
        id: req.body.id,
        title: req.body.title,
        content: req.body.content,
    };
    if (!newBlog.id) {
        return res.status(400).json({ msg: 'Please include a title and contant' });
    }
    blogs.push(newBlog);

    fs.readFile(path.join('blogs-info.json'), function(err, data) {
        if (err) throw err;
        var json = JSON.parse(data);
        json.push(newBlog);
        fs.writeFile(path.join('blogs-info.json'), JSON.stringify(json), function(err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    })
    res.json({ msg: 'Blog added' });
});
// Update a blog
router.put('/:id', function(req, res) {
    const found = blogs.some(item => item.id === parseInt(req.params.id));
    if (!found) {
        return res.status(400).json({ msg: `No blog with the title of ${parseInt(req.params.id)}` });
    }
    const id = req.params.id;
    const newContent = req.body.content;
    const newTitle = req.body.title

    // read in the JSON file
    jsonfile.readFile(path.join('blogs-info.json'), (err, obj) => {
        if (err) throw err;
        // Using another variable to prevent confusion.
        const fileObj = obj;
        // Modify the text at the appropriate id
        fileObj.forEach(blog => {
            if (blog.id === parseInt(id)) {
                blog.content = newContent;
                blog.title = newTitle;
                res.send("blog updated")
            }
        })
        jsonfile.writeFile(path.join('blogs-info.json'), fileObj, (err) => {
            if (err) throw err;
        });

    });
});
// Delete blog
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const blogToDelete = blogs.some(blog => blog.id === parseInt(id));
    if (!blogToDelete) return res.status(404).send('No such book')
    const result = blogs.splice(blogToDelete, 1);
    fs.writeFile('blogs-info.json', JSON.stringify(result), (err) => {
        if (err) throw err;
        res.json('Deleted');
    });
});
module.exports = router;