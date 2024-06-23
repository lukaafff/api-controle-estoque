import {Request, Response} from "express";
import {EditProductService} from "../../services/product/EditProductService";
import { EditProductRequest } from "../../models/interfaces/product/EditProductRequest";

class EditProductController {
    async handle(req: Request, res: Response) {
        const {name, banner, descripition, amount, price, product_id}: EditProductRequest = req.body;
        const editProductService = new EditProductService();
        const productEdited = await editProductService.execute({name, banner, descripition, amount, price, product_id});
        return res.json(productEdited);
    }
}

export {EditProductController}