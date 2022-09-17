import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";
import User from "../models/User";

//Em nosso models podemos receber vários arrays.
const models = [Aluno, User];

// connection vai receber as configuraçãoes da nossa base de dados.
const connection = new Sequelize(databaseConfig);

// Vamos percorrer todos os arrays dentro do models.
models.forEach((model) => model.init(connection));