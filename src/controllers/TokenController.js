import jwt from "jsonwebtoken";
import User from "../models/User";

class TokenController {
	// store: criandando um novo token;
	async store(req, res) {

		const { email = '', password = '' } = req.body;
		console.log({email, password});
		
		// Validando email e senha, os campos não podem ser vázio.
		if(email === '' || password === '') {
			return res.status(401).json({
				errors: ['Credenciais inválidas'],
			});
		}
		// Verificar se o usuário existe;
		const user = await User.findOne({ where: { email } });
		if(!user) {
			return res.status(401).json({
				errors: ['Usuário não existe'],
			});
		};
		// Verificando se a senha enviada é a mesma senha no banco de dados.
		if(!(await user.passwordIsValid(password))){
			return res.status(401).json({
				errors: ['Senha inválida'],
			});
		}

		// Verificando o token
		const { id } = user;
		const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
			expiresIn: process.env.TOKEN_EXPIRATION,
		});
		
		//retorna o token o usuário.
		return res.json({ token});
	};
};

export default new TokenController();