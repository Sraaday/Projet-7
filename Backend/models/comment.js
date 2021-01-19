"use strict";
const { Model } = require("sequelize");
const { models } = require("../sequelize");
const user = require("./user");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			
		}
	}
	Comment.init(
		{
			content: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
			},
			id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				foreignKey: true

			}
			
		},
		{
			sequelize,
			modelName: "Comment",
			tableName: "comments"

		}
    );
    return Comment;
};