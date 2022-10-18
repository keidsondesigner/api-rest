class HomeController {
	//index retorna todos os alunos;
	async index(req, res){
		res.json('Index')
	};
};

export default new HomeController();