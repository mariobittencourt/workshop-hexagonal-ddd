import "reflect-metadata";
import * as restify from 'restify';

let server = restify.createServer();
server.use(restify.plugins.bodyParser({ mapParams: false }));

server.listen(8000, () => {
    console.log('%s listening at %s for your requests...', server.name, server.url);
});
