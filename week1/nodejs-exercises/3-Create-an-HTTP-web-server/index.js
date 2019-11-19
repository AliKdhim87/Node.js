const http = require('http');
const fs = require('fs');
const path = require('path');
//create a server
let server = http.createServer((req, res) => {
    // Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
        // Extension of file
    let extname = path.extname(filePath);
    // Initail Contnt type 
    let contntType = 'text/html';
    // Check ext and set content type
    switch (extname) {
        case '.js':
            contntType = 'text/javascript';
            break;
        case '.css':
            contntType = 'text/css';
    }
    // Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                });
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`)
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contntType });
            res.end(content, 'utf8')
        }
    });

});

server.listen(3000, () => {
    console.log('the server listens on port 3000')
}); //the server listens on port 3000