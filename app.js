import dotenv from "dotenv";
dotenv.config();

// Importando nosso database.
import "./src/database";

import express from "express";
import homeRoutes from "./src/routes/homeRoutes";
import userRoutes from "./src/routes/userRoutes";
import alunoRoutes from "./src/routes/alunoRoutes";

// Importando rota do novo token
import tokenRoutes from "./src/routes/tokenRoutes";


class App {
	constructor(){
		this.app = express();
		this.middlewares();
		this.routes();
	}

	middlewares(){
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
	}

//passando nossas rotas;
	routes(){
		this.app.use('/', homeRoutes);
		this.app.use('/users/', userRoutes);
		this.app.use('/alunos/', alunoRoutes);
		this.app.use('/tokens/', tokenRoutes);
	}

}
export default new App().app;