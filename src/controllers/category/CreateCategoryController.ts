import {Request, Response} from "express";
import {CreateCategoryService} from "../../services/category/CreateCategoryService";
import { CategoryRequest } from "../../models/interfaces/category/CategoryRequest";

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const {name}: CategoryRequest = req.body;
        const createCategoryService = new CreateCategoryService();
        const category = await createCategoryService.execute({name});
        return res.json(category);
    }
}

export {CreateCategoryController} 