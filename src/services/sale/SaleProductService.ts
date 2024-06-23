import prismaClient from "../../prisma";
import { SaleProductRequest } from "../../models/interfaces/sale/SaleProductRequest";

class SaleProductService {
    async execute({product_id, amount}) {
        if(!product_id || !amount) {
            throw new Error("Missing params");
        }

        const queryProduct = await prismaClient.product.findFirst({
            where: {
                id: product_id
            }
        });

        if(queryProduct?.amount > amount && amount > 0) {
            const newAmount = (queryProduct?.amount - amount);
            const saveSale = await prismaClient.product.update({
                where: {
                    id: product_id
                },
                data: {
                    amount: newAmount
                },
                select: {
                    id: true,
                    name: true,
                    amount: true
                }
            });
            return saveSale;
        } else {
            throw new Error("Unable to sell");
        }
    }
}

export {SaleProductService}