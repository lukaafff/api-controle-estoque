import prismaClient from "../../prisma/index";
import {RemoveCategoryRequest} from "../../models/interfaces/category/RemoveCategoryRequest";

class RemoveCategoryService {
    async execute({category_id}: RemoveCategoryRequest) {
        const category = await prismaClient.category.delete({
            where: {
                id: category_id
            }
        });
        return category;
    }
}

export {RemoveCategoryService} 