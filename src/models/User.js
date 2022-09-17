import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

export default class User extends Model {
	static init(sequelize) {
		super.init({
			//validando campo nome com ' len '
			nome: {
				type: Sequelize.STRING,
				defaultValue: '',
				validate: {
					len: {
						args: [3, 255],
						msg: 'Campo nome deve ser entre 3 e 255 caracteres.',
					}
				}
			},
			//validando campo email com ' isEmail'
			email: {
				type: Sequelize.STRING,
				defaultValue: '',
				unique: {
					msg: 'Email já existe'
				},
				validate: {
					isEmail: {
						msg: 'Email inválido.',
					}
				}
			},
			// Esse recebe o password já encriptado e validado.
			password_hash: {
				type: Sequelize.STRING,
				defaultValue: '',
			},
			// Esse não vai para o banco, é onde validamos o password.
			password: {
				type: Sequelize.VIRTUAL,
				defaultValue: '',
				validate: {
					len: {
						args: [6, 50],
						msg: 'Campo senha deve ser entre 6 e 50 caracteres.',
					}
				}
			},
		}, {
			sequelize,
		});

		// O user.password('123456') é encriptado pelo bcryptjs.hash
		//e depois o user.password_hash('ca4e913424bfcfe71c016829a371a1f1') recebe o password encriptado.
		// passamos o Salt do hash, que neste caso é 8
		this.addHook('beforeSave', async user => {
			if(user.password){
				user.password_hash = await bcryptjs.hash(user.password, 8);
			}
		})

		return this;
	};

	// vou recebr um password,
	passwordIsValid(password) {
		return bcryptjs.compare(password, this.password_hash);
	};
}