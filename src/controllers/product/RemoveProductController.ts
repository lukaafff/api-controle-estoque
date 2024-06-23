import {Request, Response} from "express";
import {RemoveProductService} from "../../services/product/RemoveProductService";

class RemoveProductController {
    async handle(req: Request, res: Response) {
        const product_id = req.query.product_id as string;
        const removeProductService = new RemoveProductService();
        const productDeleted = await removeProductService.execute({product_id});
        return res.json(productDeleted);
    }
}

export {RemoveProductController}