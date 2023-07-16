import prisma from "../application/database.js";
import crypto from "crypto";
import ResponseError from "../error/response-error.js";
import jwt from "jsonwebtoken";
import generate_voucher from "../utils/generate_voucher.js";
const {JWT_SECRET_KEY = "rahasia"} = process.env;

const getVoucher = async ({authorization, user_id}) => {
    if(authorization){
        const data = await jwt.verify(authorization, JWT_SECRET_KEY);
        if(!data){
            throw new ResponseError(400, "token expired");
        }
        const voucher = await generate_voucher(data.id);
        return voucher;
    } else {
        if(user_id){
        const voucher = await generate_voucher(+user_id);
        return voucher;
        }

        const randomString = crypto.randomBytes(Math.ceil(3 / 2)).toString('hex').slice(0, 3);
        const user = await prisma.user.create({
            data: {
                name: randomString,
                email: `${randomString}@gmail.com`,
                password: randomString
            }
        })

        const voucher = await generate_voucher(user.id);

        return {id: user.id, voucher};
    }

}

export default getVoucher;