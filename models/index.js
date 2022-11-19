const Sequelize = require('sequelize');
const Vpc = require('./vpc');
const Subnet = require('./subnet');
const db = {};

sequelize = new Sequelize('aws', 'robolovo', 'robolovo', {
    database: "aws",
    username: "robolovo",
    password: "robolovo",
    dialect: "mysql",
    host: "localhost",
    port: "3306"
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Vpc = Vpc;
db.Subnet = Subnet;

Vpc.init(sequelize);
Subnet.init(sequelize);

module.exports = db;