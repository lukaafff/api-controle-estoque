import { Router, Request, Response } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import {CreateUserController} from "./controllers/user/CreateUserController";
import {AuthUserController} from "./controllers/user/AuthUserController";
import {DetailUserController} from "./controllers/user/DetailUserController";
import {RemoveUserController} from "./controllers/user/RemoveUserController";
import {CreateCategoryController} from "./controllers/category/CreateCategoryController";
import {EditCategoryController} from "./controllers/category/EditCategoryController";
import {ListCategoryController} from "./controllers/category/ListCategoryController";
import {isAuthenticated} from "./middlewares/isAuthenticated";
import { RemoveCategoryController } from "./controllers/category/RemoveCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { EditProductController } from "./controllers/product/EditProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { ListProductController } from "./controllers/product/ListProductController";
import { RemoveProductController } from "./controllers/product/RemoveProductController";
import { SaleProductController } from "./controllers/sale/SaleProductController";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

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
router.put('/category/edit', isAuthenticated, new EditCategoryController().handle);
router.get('/category/all', isAuthenticated, new ListCategoryController().handle);
router.delete('/category/remove', isAuthenticated, new RemoveCategoryController().handle);

//product routes
router.post('/product', isAuthenticated, upload.single("file"), new CreateProductController().handle);
router.put('/product/edit', isAuthenticated, upload.single("file"), new EditProductController().handle);
router.get('/product', new ListProductByCategoryController().handle);
router.get('/product/all', new ListProductController().handle);
router.delete('/product/remove', isAuthenticated, new RemoveProductController().handle);

//sale product routes
router.put('/sale/product', isAuthenticated, new SaleProductController().handle);

export {router};