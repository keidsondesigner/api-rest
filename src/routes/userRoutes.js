import { Router } from "express";
import userController from "../controllers/UserController";

import loginRequired from "../middlewares/loginRequired";

const router = new Router();

//Esses dois nõa deveriam exitir, pois seriam um vazmento de dados;
// router.get('/', loginRequired, userController.index); // lista todos users;
// router.get('/:id', userController.show); // lista um user por id;

// Usário não pode editar ou atuazlizar informações de outros usuários;
// router.post('/', userController.store);
// router.put('/:id', userController.update);
// router.delete('/:id', userController.delete);
// ---- Usário só pode editar ou atuazlizar seus dados -----
router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;