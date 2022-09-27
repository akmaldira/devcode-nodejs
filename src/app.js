const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const compression = require('compression');
const db = require('./config/database');

//Configuration dot env
dotenv.config();

const app = express();
const activityGroupsRouter = require('./router/actifityGroupsRouter');
const todoItemsRouter = require('./router/todoItemsRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

app.use('/activity-groups', activityGroupsRouter);
app.use('/todo-items', todoItemsRouter);

module.exports = app;