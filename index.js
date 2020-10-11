const fs = require('fs');
const express = require('express');
const users = require('./users.json');

const app = express();

app.post('/register', (req, res) => {
    req.on('data', data => {
        if (data) {
            const user = JSON.parse(data);
            const newList = users.concat(user);
            fs.writeFile('users.json', JSON.stringify(newList), () => console.log('Write'));
            return res.status(201).send(`Welcome ${user}`);
        }
        res.send('Invalid value');
    });
});

app.get('/user/:username', async (req, res) => {
    try {
        const person = users.filter(user => user.username == req.params.username);
        console.log('Person: ', person);
        return res.status(200).send(`${req.params.username} you are logged!`)
    }
    catch (err) { console.error( err ) }
});

app.listen(3000, console.log(`Port: 3000`));
