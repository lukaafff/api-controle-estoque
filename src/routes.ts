import { Router, Request, Response } from "express";
import {CreateUserController} from "./controllers/user/CreateUserController";
import {AuthUserController} from "./controllers/user/AuthUserController";
import {DetailUserController} from "./controllers/user/DetailUserController";
import {RemoveUserController} from "./controllers/user/RemoveUserController";
import {CreateCategoryController} from "./controllers/category/CreateCategoryController";
import {isAuthenticated} from "./middlewares/isAuthenticated";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
    return res.json({ok: true});
});

//user routes
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.delete('/user/remove', new RemoveUserController().handle);

//category routes
router.post('/category', isAuthenticated, new CreateCategoryController().handle);

export {router};