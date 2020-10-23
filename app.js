const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./src/routes/auth');
const tasksRoutes = require('./src/routes/tasks');

const app = express();

app.use(bodyParser.json());
app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

// const readUsers = () => {
//     return fs.readFile(keys.usersURI, 'utf-8', (err, data) => {
//         if (err) console.error('Error: ', err);
//         console.log('Users Collection is Reading.');
//     });
// }
// const readTasks = () => {
//     return fs.readFile(keys.tasksURI, 'utf-8', (err, data) => {
//         if (err) console.error('Error: ', err);
//         console.log('Tasks Collection is Reading.');
//     });
// }

module.exports = app;
