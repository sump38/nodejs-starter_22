const http = require('http');

const js = `
    alert('my Script is working');
`

const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Website!</title>
        <script src="script.js"></script>
    </head>
    <body>
        Hello world
    </body>
    </html>
`;

const server = http.createServer((request, response) => {
    console.log(request.url);
    if(request.url === '/favicon.ico') {
        response.statusCode = 404;
        response.end();
    } else {
        if(request.url === '/hello') {
            response.statusCode = 200;
            response.setHeader('content-type', 'text/html');
            response.write(html);
            response.end();
        } else {
            if(request.url === '/script.js') {
                response.statusCode = 200;
                response.write(js);
                response.end();
            } else {
                const name = request.url.toString().replace('/',''); 
                response.statusCode = 200;
                response.setHeader('content-type', 'text/html');
                response.write(`<html><body>Hello ${name}</body></html>`);
                response.end();
            }
        }
    }


});

server.listen(999);