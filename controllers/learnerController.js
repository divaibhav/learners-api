const learnerDao = require('../dao/learnerDao');
const getAllLearners = async (req, res) => {
    try {
        const learners = await learnerDao.getAllLearners();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(learners));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
};
const getLearnerById = async (req, res, id) => {
    try {
        const learner = await learnerDao.getLearnerById(id);
        if (!learner) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Learner not found' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(learner));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
};
const updateLearner = async (req, res, id) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const result = await learnerDao.updateLearner(id, data);
            if (result.affectedRows === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Learner not found' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Learner updated successfully' }));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

const deleteLearner = async (req, res, id) => {
    try {
        const result = await learnerDao.deleteLearner(id);
        if (result.affectedRows === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Learner not found' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Learner deleted successfully' }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
};

const addLearner = async (req, res) =>{
    let body = '';

    req.on('data', chunk => {body += chunk});
    req.on('end', async () => {
        try{
            const data = JSON.parse(body);
            const result = await learnerDao.addLearner(data);
            if(result.affectedRows === 0){
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({message: "learner not added" }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Learner added successfully' }));
        }
        catch(err){
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }))
        }
    });
};

module.exports = {
    getAllLearners,
    getLearnerById,
    updateLearner,
    deleteLearner,
    addLearner
};