const express = require('express');
const app = express();

// body Parser Midlleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/blogs', require('./routes/api/blogs'))

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server running on port :${port}`);
});