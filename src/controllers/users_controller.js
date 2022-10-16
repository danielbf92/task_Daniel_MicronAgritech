import { getConnection } from "./../database/database";

const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {

    try {
        //mysql connection
        const connection = await getConnection();
        //query necessary to obtain the users.
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
        //mysql connection
        const connection = await getConnection();
        //query necessary to obtain specific user.
        const result = await connection.query("SELECT id, email, password, name, surname FROM users WHERE id = ?", id);
        res.json(result);

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const userLogin = async (req, res) => {

    try {
        const {email, password} = req.body;
        if (email === undefined || password === undefined){
            res.status(400).json({message: "Bad Request, the email and password are required."})
        }
        //mysql connection
        const connection = await getConnection();
        //query necessary to obtain the users (login).
        const result = await connection.query("SELECT id, email, password, name, surname FROM users WHERE email = ?", email);
        //compare the passwords, and we will validate that both are the same (encrypted and the original password)
        if (result.length != 0){
            bcrypt.compare(password, result[0]['password'], (err, data) => {
                //if error than throw error
                if (err) throw err
                //if both match than you can do anything
                if (data) {
                    return res.status(200).json({ msg: "Login success" })
                } else {
                    return res.status(401).json({ msg: "Invalid credencial" })
                }
            })
        }else{
            res.status(400).json({message: "Bad Request, this email doesn't exist..."})
        }
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const addUser = async (req, res) => {

    try {
        const {id, email, password, name, surname} = req.body;
        //encrypt the original password.
        const passwordHash = await bcrypt.hash(password, 8);
        //mysql connection
        const connection = await getConnection();
        //validation where the user must not exist to be added
        const user_name = await connection.query("SELECT * FROM users WHERE email = ?", email);
        console.log("Result email: ",user_name)
        //to add a user we must have the mail and password. Here we will validate
        if (email === undefined || password === undefined){
            res.status(400).json({message: "Bad Request, The email and password are required."});
        }
        else if (user_name.length === 0){
            const add_users = {id, email, password:passwordHash, name, surname};
            //query necessary to add users.
            await connection.query("INSERT INTO users SET ?", add_users);
            res.json({message: "User added"});
        } else {
            res.status(400).json({message: "Bad Request, The user already exists."});
        }

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const updateUser = async (req, res) => {

    try {
        const { id } = req.params;
        const {email, password, name, surname} = req.body;
        const passwordHash = await bcrypt.hash(password, 8);
        //to update a user we must have the mail and password. Here we will validate
        if (id === undefined || password === undefined){
            res.status(400).json({message: "Bad Request, The username and password are required."})
        }
        const update_users = {id, email, password:passwordHash, name, surname};
        //mysql connection
        const connection = await getConnection();
        //query necessary to update users.
        await connection.query("UPDATE users SET ? WHERE id = ?", [update_users, id]);
        res.json({message: "User updated"});

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const deleteUser = async (req, res) => {

    try {
        const { id } = req.params;
        //mysql connection
        const connection = await getConnection();
        //query necessary to delete user.
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
    userLogin,
    addUser,
    updateUser,
    deleteUser,
};