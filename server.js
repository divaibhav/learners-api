require('dotenv').config();
const http = require('http');
const url = require('url');
const learnerController = require('./controllers/learnerController');

const server = http.createServer( async (req, res)=>{
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;
    
    if(method === 'GET' && pathname === '/learners') {
        return learnerController.getAllLearners(req, res);
    }
    const learnerIdByMatch = pathname.match(/^\/learners\/(\d+)$/);

    if(method === 'GET' && learnerIdByMatch){
        const id = learnerIdByMatch[1];
        return learnerController.getLearnerById(req, res, id);
    }

    if(method === 'PUT' && learnerIdByMatch){
        const id = learnerIdByMatch[1];
        return learnerController.updateLearner(req, res, id);
    }

    if(method === 'DELETE' && learnerIdByMatch){
        const id = learnerIdByMatch[1];
        return learnerController.deleteLearner(req, res, id);
    }

    if(method === 'POST' && pathname === '/learners'){
        return learnerController.addLearner(req, res);
    }

});
const port = process.env.PORT;
const host  = process.env.HOST;
server.listen(port, host, () =>{
    console.log(`Server is running on http://${host}:${port}`);
    
});


