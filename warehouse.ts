import * as restify from "restify";
import {v4 as uuid} from "uuid";

let server = restify.createServer();
server.use(restify.plugins.bodyParser({ mapParams: false }));

server.listen(8001, () => {
    console.log('%s listening at %s for your requests...', server.name, server.url);
});

// My fake warehouse system
server.post('/outbound', (req, res, next) => {
    console.log('Request received', req.body);
   res.send({
       response_id: uuid(),
       status: 'Processed'
   });
   next();
});