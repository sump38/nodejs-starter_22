const express = require('express');

const app = express();

app.use('/home', (req,res) => {
    res.send('<html><body>Hello homepage</body></html>');
})

app.use('/redirect',(req, res) => {
    res.redirect('https://www.nodejs.com');
    // res.send('<html><body>hello world</body></html>');
});

app.use('/', (req, res) => {
    res.status(404).send('NOT FOUND');
})


app.listen(999);