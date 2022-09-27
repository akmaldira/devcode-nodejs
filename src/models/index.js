const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../config/database');

sequelize.authenticate()
    .then(() => {
        console.log('connected..')
    })
    .catch(err => {
        console.log('Error'+ err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.actifity = require('./ActivityModels')(sequelize, DataTypes);
db.todo = require('./TodoModels')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    });


db.actifity.hasMany(db.todo, {
    foreignKey: 'activity_group_id',
    as: 'todo'
})

db.todo.belongsTo(db.actifity, {
    foreignKey: 'activity_group_id',
    as: 'actifity'
})

module.exports = db