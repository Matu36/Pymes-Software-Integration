const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    role: { // null: basic user ; false: admin user ; true: super admin user
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    active: { // false: banned/disabled ; true: active
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    banned: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
  }, {
    updatedAt: false
  });
};