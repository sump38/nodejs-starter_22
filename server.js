const express = require('express');

const app = express();

app.use('/',(req, res) => {
    res.send('<html><body>hello world</body></html>');
});

app.listen(999);