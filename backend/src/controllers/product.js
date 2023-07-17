import productService from "../service/product.js"

export default class Product {
    static getAll = async (req,res,next) => {
        try {
            const product = await productService.getAll()

            return res.status(200).json({
                status: true,
                message: "succes get all product",
                data: product
            })
        } catch (e) {
            next(e)
        }
    }

    static getbyId = async (req,res,next) => {
        try {
            const {id} = req.params
            const product = await productService.getById(id);

            return res.status(200).json({
                status: true,
                message: "succes get One product",
                total: 1,
                data: product
            })
        } catch (e) {
            next(e)
        }
    }

    static buyProduct = async (req,res,next) => {
        try {
            const result = await productService.buyProduct(req.body, req.user.id);

            return res.status(200).json({
                status: true,
                message: "order succes",
                data: result
            })
        } catch (e) {
            next(e)
        }
    }

    
}