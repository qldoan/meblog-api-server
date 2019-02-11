const { Sequelize, sequelize } = require('./base');

const Project = sequelize.define('tbl_project', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  description: Sequelize.STRING,
  image: Sequelize.STRING,
  name: Sequelize.STRING,
  position: Sequelize.STRING,
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

module.exports = Project;