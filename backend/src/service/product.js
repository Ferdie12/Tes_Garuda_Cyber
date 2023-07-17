import prisma from "../application/database.js";
import ResponseError from "../error/response-error.js";

const getAll = async () => {
    const product = await prisma.product.findMany();

    if(!product){
        throw new Error("data product is empty")
    }
    return product
};

const getById = async (request) => {
    const product = await prisma.product.findUnique({where: {id: +request}});
    if(!product){
        throw new ResponseError(400,"product not found")
    };
    return product
}

const buyProduct = async (request, id) => {
    const order = await prisma.order.create({
        data: {
            user_id: id,
            product_id: request.id,
            total_price: request.total_price
        }
    })

    if(!order){
        throw new ResponseError(400, "order failed");
    }

    return order;
}

export default {getAll, getById, buyProduct};