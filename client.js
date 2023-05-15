const express = require('express');
const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
app.use(cors());
app.use(bodyParser.json())

const root = require('path').join(__dirname, 'build');
app.use(express.static(root));

app.use('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3006;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
