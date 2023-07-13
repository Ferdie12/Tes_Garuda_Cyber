import prisma from "../prisma/config.js";
import crypto from "crypto";

export default class Voucher {
    static getVoucher = async (req,res,next) => {
        try {
            const {total_price, code} = req.query;
            
            if(total_price < 2000000){
                return res.status(400).json({
                    status: false,
                    message: "you must buy Rp.2.000.000 to get voucher"
                })
            }

            if(code){
            const existingVoucher = await prisma.voucher.findFirst({
                where: {code},
              });
        
              if (existingVoucher) {
                return res.status(200).json({
                  status: true,
                  message: "You already have a valid voucher",
                  data: existingVoucher,
                });
              }
            }

            const randomString = crypto.randomBytes(Math.ceil(10 / 2)).toString('hex').slice(0, 10);
            const exp = new Date();
            exp.setMonth(exp.getMonth() + 3);

            const voucher = await prisma.voucher.create({
                data: {
                    code: randomString,
                    value: 10000,
                    is_default: true,
                    exp
                },
                select: {
                    id: true,
                    code: true
                }
            })

            return res.status(201).json({
                status: true,
                message: "create voucher succes",
                data: voucher
            })
        } catch (error) {
            next(error)
        }
    }

    static useVoucher = async (req,res,next) => {
        try {
            const {total_price, code,id}= req.query;

            const today = Date.now();
            const checked = await prisma.voucher.findFirst({
                where:{
                    AND: [
                        {code},
                        {is_default: false}
                    ]
                }
            });
            if(checked){
                return res.status(400).json({
                    status: false,
                    message: "token expired because used",
                    data: total_price
                })
            }
            const update = await prisma.voucher.update({
                data: { is_default: false },
                where: {id: +id}
              });
              
            if(!update || today >= update.exp){
                return res.status(400).json({
                    status: false,
                    message: "token expired because exp",
                    data: total_price
                })
            }

            return res.status(200).json({
                status: true,
                message: "succes use token",
                data: +total_price - update.value 
            })

        } catch (error) {
            next(error)
        }
    }
}