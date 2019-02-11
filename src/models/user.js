const { Sequelize, sequelize } = require('./base');

const User = sequelize.define('tbl_user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updated_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true,
  freezeTableName: true
});

module.exports = User;