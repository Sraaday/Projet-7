const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('groupomania', 'Admin', 'MutterY2554', {
    host: 'localhost',
    dialect: 'mysql'
});

require("./models/comment.js")(sequelize, DataTypes);
require("./models/user.js")(sequelize, DataTypes);
require("./models/gif.js")(sequelize, DataTypes);

//sequelize.sync({force: true});

module.exports = sequelize;