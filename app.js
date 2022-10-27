// Importando nosso .env

import dotenv from "dotenv";
dotenv.config();

// Importando nosso database.
import "./src/database";

// Importando nossas rotas.

import express from "express";
import homeRoutes from "./src/routes/homeRoutes";
import userRoutes from "./src/routes/userRoutes";
import alunoRoutes from "./src/routes/alunoRoutes";
import photoRoutes from "./src/routes/photoRoutes";

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
		this.app.use('/v1/api/escola/', homeRoutes);
		this.app.use('/v1/api/escola/users/', userRoutes);
		this.app.use('/v1/api/escola/tokens/', tokenRoutes);
		this.app.use('/v1/api/escola/alunos/', alunoRoutes);
		this.app.use('/v1/api/escola/photos/', photoRoutes);
	}

}
export default new App().app;