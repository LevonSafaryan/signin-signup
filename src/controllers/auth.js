const fs = require('fs').promises;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys')
const User = require('../models/User');
const users = require('../db/users.json');

module.exports.login = async (req, res) => {

    const person = users
        .filter(user => user.username == req.body.username)
        .map(user => {
            // console.log('User: ', user);
            const passwordResult = bcrypt.compare(req.body.password, user.password);
            if (passwordResult) {
                // generate token
                const token = jwt.sign({
                    username: user.username
                }, keys.jwtSecret, { expiresIn: 60 * 60 });

                return res.status(200).set('Authorization', token).json({
                    token: `Bearer ${token}`
                });
            } else {
                return res.status(401).json({
                    message: 'Passwords do not match.'
                });
            }
        });

    if (person == '') {
        res.status(404).json({
            message: 'Person not found.'
        });
    }
}

module.exports.register = async (req, res) => {
    if (JSON.stringify(users).includes(req.body.username)) {
        res.status(409).json({
            message: `${req.body.username} username exists.`
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const pass = req.body.password
        const user = new User(
            username = req.body.username,
            password = bcrypt.hashSync(pass, salt)
        );
        const newList = JSON.stringify(users.concat(user));

        try {
            await fs.writeFile(keys.usersURI, newList, () => console.log('List = ', newList));
            return res.status(201).json(user);
        } catch (e) {
            console.error('Error: ', e);
            res.status().json({
                message: `Error: ${e}`
            });
        }
    }
};
