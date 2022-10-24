import Aluno from "../models/Aluno";

class AlunoController {
	async index(req, res) {
		// <ostrar todos os alunos;
		const alunos = await Aluno.findAll();
		res.json(alunos);
	};

	async store(req, res) {
		try {
			// Creando um aluno;
			const aluno = Aluno.create(req.body);

			return res.json(aluno);

		} catch (e) {
			return res.status(400).json({
				errors: e.error.map(err => err.message),
			});
		}
	};

	async show(req, res) {
		try {
			const { id } = req.params;

			if(!id){
				return res.status(404).json({
					errors: ['Faltando ID'],
				});
			}

			const aluno = await Aluno.findByPk(id);

			if(!aluno){
				return res.status(404).json({
					errors: ['Aluno não existe'],
				});
			}
			// tendo certerza que o aluno existe, vamos MOSTRAR o aluno
			return res.json(aluno);

		} catch (e) {
			return res.status(400).json({
				errors: e.error.map(err => err.message),
			});
		}
	};

	async delete(req, res) {
		try {
			const { id } = req.params;

			if(!id){
				return res.status(404).json({
					errors: ['Faltando ID'],
				});
			}

			const aluno = await Aluno.findByPk(id);

			if(!aluno){
				return res.status(404).json({
					errors: ['Aluno não existe'],
				});
			}
			// tendo certerza que o aluno existe, vamos DELETAR;
			await aluno.destroy();
			return res.json({
				apagado: true,
			});

		} catch (e) {
			return res.status(400).json({
				errors: e.error.map(err => err.message),
			});
		}
	};

	async update(req, res) {
		try {
			const { id } = req.params;

			if(!id){
				return res.status(404).json({
					errors: ['Faltando ID'],
				});
			}

			const aluno = await Aluno.findByPk(id);
			// Checando se o aluno existe pelo id;
			if(!aluno){
				return res.status(404).json({
					errors: ['Aluno não existe'],
				});
			}
			// tendo certerza que o aluno existe, vamos ATUALIZAR o aluno
			const alunoAtualizado  = aluno.update(req.body);
			return res.json(alunoAtualizado);

		} catch (e) {
			return res.status(400).json({
				errors: e.error.map(err => err.message),
			});
		}
	};
}
export default new AlunoController();