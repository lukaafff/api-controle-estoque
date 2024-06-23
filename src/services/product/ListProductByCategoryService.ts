import prismaClient from "../../prisma";
import { ListProductByCategoryRequest } from "../../models/interfaces/product/ListProductByCategoryRequest";

class ListProductByCategoryService {
    async execute({ category_id}: ListProductByCategoryRequest) {
        const findProductByCategoryId = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            }
        });
        return findProductByCategoryId;
    }
}

export {ListProductByCategoryService}