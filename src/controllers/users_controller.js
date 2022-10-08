import { getConnection } from "./../database/database";

const getUsers = async (req, res) => {

    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, email, password, name, surname FROM users");
        res.json(result);

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const getUser = async (req, res) => {

    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, email, password, name, surname FROM users WHERE id = ?", id);
        res.json(result);

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const addUser = async (req, res) => {

    try {
        const {id, email, password, name, surname} = req.body;
        if (id === undefined || password === undefined){
            res.status(400).json({message: "Bad Request, The username and password are required."})
        }
        const add_users = {id, email, password, name, surname};
        const connection = await getConnection();
        await connection.query("INSERT INTO users SET ?", add_users);
        res.json({message: "User added"});

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const updateUser = async (req, res) => {

    try {
        const { id } = req.params;
        const {email, password, name, surname} = req.body;
        if (id === undefined || password === undefined){
            res.status(400).json({message: "Bad Request, The username and password are required."})
        }
        const update_users = {id, email, password, name, surname};
        const connection = await getConnection();
        await connection.query("UPDATE users SET ? WHERE id = ?", [update_users, id]);
        res.json({message: "User added"});

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const deleteUser = async (req, res) => {

    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM users WHERE id = ?", id);
        res.json(result);

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
    
};