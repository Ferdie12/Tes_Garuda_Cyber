import prisma from "../prisma/config.js";

export default class Product {
    static getAll = async (req,res,next) => {
        try {
            const product = await prisma.product.findMany();

            return res.status(200).json({
                status: true,
                message: "succes get all product",
                data: product
            })
        } catch (error) {
            next(error)
        }
    }

    static getbyId = async (req,res,next) => {
        try {
            const {id} = req.params
            const product = await prisma.product.findUnique({where: {id: +id}});


            return res.status(200).json({
                status: true,
                message: "succes get One product",
                total: 1,
                data: product
            })
        } catch (error) {
            next(error)
        }
    }

    
}