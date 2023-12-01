import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  'imobiliaria', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});