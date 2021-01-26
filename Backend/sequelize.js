const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
    host: `${process.env.DB_HOST}`,
    dialect: `${process.env.DB_DIALECT}`
});

require("./models/comment.js")(sequelize, DataTypes);
require("./models/user.js")(sequelize, DataTypes);
require("./models/gif.js")(sequelize, DataTypes);

//sequelize.sync({alter: true});

module.exports = sequelize;