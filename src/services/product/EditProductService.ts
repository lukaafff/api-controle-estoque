import prismaClient from "../../prisma";
import { EditProductRequest } from "../../models/interfaces/product/EditProductRequest";

class EditProductService {
  async execute({ name, amount, descripition, banner, price, product_id }) {
    const productEdited = await prismaClient.product.update({
      where: {
        id: product_id,
      },
      data: {
        name: name,
        amount: +amount,
        descripition: descripition,
        banner: banner,
        price: price,
      },
    });
    return productEdited;
  }
}

export { EditProductService };
