// modelo/Music.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Music = sequelize.define('Music', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  audioFile: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false // Deshabilitar los timestamps
});

export default Music;
