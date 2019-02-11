const { Sequelize, sequelize } = require('./base');

const Post = sequelize.define('tbl_post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: Sequelize.STRING,
  show: Sequelize.BOOLEAN,
  title: Sequelize.STRING,
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

module.exports = Post;