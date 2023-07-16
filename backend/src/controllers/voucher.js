import get from "../service/voucher.js";

export default class Voucher {
    static getVoucher = async (req,res,next) => {
        try {
            const result = await get.getVoucher(req.headers);
            
            return res.status(201).json({
                status: true,
                message: "create voucher succes",
                id: result.id,
                data: result.voucher
            })
        } catch (error) {
            next(error)
        }
    }

    static useVoucher = async (req,res,next) => {
        try {
            const result = await get.useVoucher(req.query);

            return res.status(200).json({
                status: true,
                message: "succes use token",
                data: result
            })

        } catch (error) {
            next(error)
        }
    }
}