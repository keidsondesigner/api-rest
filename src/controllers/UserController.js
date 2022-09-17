import User from "../models/User";

class UserController {
	//store cria um novo user
	async store(req, res) {
		try {
			const novoUser = await User.create(req.body);
			return res.json(novoUser);
		} catch (e) {
			return res.status(400).json({
				errors: e.errors.map(err => err.message),
			});
		}
	};

	//Index retornar todos os users
	async index(req, res){
		try {
			const users = await User.findAll()
			return res.json(users);
		} catch(e){
			return res.json(null);
		}
	};

	// Show mostrar 'user' por 'id' da rota
	// recebendo 'id' como 'parâmetro' ;
	async show(req, res){
		try {
			const user = await User.findByPk(req.params.id);
			return res.json(user);
		} catch (e) {
			return res.json(null);
		}
	};

	//Update - primeiro verifico se o user existe, para depois atualizar;
	async update(req, res){
		try {
			if(!req.params.id){
				return res.status(400).json({
					errors: ['ID não encontrado.'],
				});
			}

			const user = await User.findByPk(req.params.id);

			if(!user){
				return res.status(400).json({
					errors: ['Usuário não existe.'],
				});
			}

			const dadosAtualizados = await user.update(req.body);

			return res.json(dadosAtualizados);
		} catch (e) {
			return res.status(400).json({
				errors: e.errors.map(err => err.message),
			});
		}
	};

	//Delete - primeiro verifico se o user existe, para depois deletar;
	async delete(req, res){
		try {
			if(!req.params.id){
				return res.status(400).json({
					errors: ['ID não encontrado.'],
				});
			}

			const user = await User.findByPk(req.params.id);

			if(!user){
				return res.status(400).json({
					errors: ['Usuário não existe.'],
				});
			}

			await user.destroy();
			return res.json(user);
			
		} catch (e) {
			return res.status(400).json({
				errors: e.errors.map(err => err.message),
			});
		}
	};
};

export default new UserController();