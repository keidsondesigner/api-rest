import multer from "multer";
import multerConfig from "../config/multerConfig";

// nome 'photo' que foi escolido para a requisição;
const upload = multer(multerConfig).single('photo');


class PhotoController {
	//Criandando a foto;
	async store(req, res){
		return upload(req, res, (error) => {
			if (error){
				return res.status(400).json({
					// retornando a messagem de error, quando o arquivo não for JPEG ou PNG;
					erros: [error.code],
				});
			}

			return res.json(req.file);
		})
	};
};

export default new PhotoController();