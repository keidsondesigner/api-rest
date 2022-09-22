
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
	const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({
            errors: ['Login required']
        });
    };

    // separando o 'texto Bearer' do 'token'.
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ny
    const [, token] = authorization.split(' ');

    try {
        const dados = jwt.verify(token, process.env.TOKEN_SECRET);

		//Payload do 'id' e 'email'
        const { id, email } = dados;
        req.userId = id;
        req.userEmail = email;
        return next();

    } catch (e) {
        return res.status(401).json({
            errors: ['Token expirado ou inválido']
        });
    }
};