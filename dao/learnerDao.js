const pool = require('../config/db');

const getAllLearners = async () => {
    const[rows] = await pool.query("SELECT * FROM learners");
    return rows;
}

const getLearnerById = async (id) =>{
    const [rows] = await pool.query('SELECT * FROM learners WHERE id = ?', [id]);
    return rows;
}

const updateLearner = async (id, data) => {
    const {name, email, course} = data; 
    const [result] = await pool.query("UPDATE learners SET name = ?. email = ?, course = ? WHERE id = ?", [name, email, course, id]);
    return result;
}

const deleteLearner = async (id) =>{
    const [result] =  await pool.query ('DELETE FROM learners WHERE id = ?', [id]);
    return result;
}

const addLearner = async (data) => {
    const {name, email, course} = data;
    const [rows] = await pool.query('INSERT INTO learners (name, email, course) VALUES (?, ?, ?)');
    return rows;
}

module.exports = {
    getAllLearners,
    getLearnerById,
    updateLearner,
    deleteLearner,
    addLearner
};