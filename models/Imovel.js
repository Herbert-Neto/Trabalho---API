import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conecta.js';

export const Imovel = sequelize.define('imovel', {
    id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    rua: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    cidade: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    bairro: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    paranoid: true,
    tableName:"imoveis"
  });