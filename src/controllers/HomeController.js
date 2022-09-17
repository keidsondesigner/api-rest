import Aluno from "../models/Aluno";

class HomeController {
	//store cria um novo aluno;
	async store(req, res) {
		try {
			const novoAluno = await Aluno.create(req.body);
			return res.json(novoAluno);
		} catch (e) {
			return res.status(400).json({
				error: e.errors.map(err => err.message),
			});
		};
	};

	//index retorna todos os alunos;
	async index(req, res){
		try{
			const alunos = await Aluno.findAll();
			return res.json(alunos);
		} catch (e) {
			return res.json(null);
		}
	};
};

export default new HomeController();