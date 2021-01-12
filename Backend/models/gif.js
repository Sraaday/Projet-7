"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Gif extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			
		}
	}
	Gif.init(
		{
			title: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true,
            },
            like: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            dislike: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            usersLiked: {
              type: DataTypes.JSON,
              allowNull: true
            },
            usersDisliked: {
                type: DataTypes.JSON,
                allowNull: true
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
            modelName: "Gif",
            tableName:"gifs"
		}
    );
    return Gif;
};