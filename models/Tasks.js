const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('todoList', 'root', '22092004', {
    host: 'localhost',
    dialect:'mysql'
});

const Task = sequelize.define('tasks', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING
    }
});

//Task.sync({force: true});

module.exports = Task