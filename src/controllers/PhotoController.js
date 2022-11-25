import multer from "multer";
import multerConfig from "../config/multerConfig";

import Photo from "../models/Photo";

// nome 'photo' que foi escolido para a requisição;
const upload = multer(multerConfig).single('photo');


class PhotoController {
	//Criandando a foto;
	store(req, res){
		return upload(req, res, async (error) => {
			if (error){
				return res.status(400).json({
					// retornando a messagem de error, quando o arquivo não for JPEG ou PNG;
					erros: [error.code],
				});
			}

			const { originalname, filename } = req.file;
			const { aluno_id } = req.body;
			const photo = await Photo.create({ originalname, filename, aluno_id });

			return res.json(photo);
		})
	};
};

export default new PhotoController();