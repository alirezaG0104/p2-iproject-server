'use strict';
const { hashSync } = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Request)
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'Email is required'
        },
        notNull:{
          msg:'Email is required'
        },
        isEmail:{
          msg:'Invalid email format'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'Password is required'
        },
        notNull:{
          msg:'Password is required'
        }
      }
    },
    phoneNumber: DataTypes.INTEGER,
    address: DataTypes.STRING,
    points: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user,option)=>{
    user.password = hashSync(user.password,10)
  })
  return User;
};