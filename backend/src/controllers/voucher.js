import get from "../service/voucher.js";

export default class Voucher {
    static getVoucher = async (req,res,next) => {
        try {
            const result = await get(req.headers);
            
            return res.status(201).json({
                status: true,
                message: "create voucher succes",
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    // static useVoucher = async (req,res,next) => {
    //     try {
    //         const {total_price, code,id}= req.query;

    //         const today = Date.now();
    //         const checked = await prisma.voucher.findFirst({
    //             where:{
    //                 AND: [
    //                     {code},
    //                     {is_default: false}
    //                 ]
    //             }
    //         });
    //         if(checked){
    //             return res.status(400).json({
    //                 status: false,
    //                 message: "token expired because used",
    //                 data: total_price
    //             })
    //         }
    //         const update = await prisma.voucher.update({
    //             data: { is_default: false },
    //             where: {id: +id}
    //           });
              
    //         if(!update || today >= update.exp){
    //             return res.status(400).json({
    //                 status: false,
    //                 message: "token expired because exp",
    //                 data: total_price
    //             })
    //         }

    //         return res.status(200).json({
    //             status: true,
    //             message: "succes use token",
    //             data: +total_price - update.value 
    //         })

    //     } catch (error) {
    //         next(error)
    //     }
    // }
}