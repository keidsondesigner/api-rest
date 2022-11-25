import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";
import User from "../models/User";
import Photo from "../models/Photo";

//Em nosso models podemos receber vários arrays.
//Todo Model criando deve ser importado aqui;
const models = [Aluno, User, Photo];

// connection vai receber as configuraçãoes da nossa base de dados.
const connection = new Sequelize(databaseConfig);

// Vamos percorrer todos os arrays dentro do models.
models.forEach((model) => model.init(connection));

// verificando 'se exite' o método associate tem em models;
models.forEach((model) => model.associate && model.associate(connection.models));